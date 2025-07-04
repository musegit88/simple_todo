import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope:
            "https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
        },
      },
    }),
  ],
  debug: true,
  pages: {
    error: "/auth-error",
  },
  callbacks: {
    async session({ session, user }) {
      const [googleAccount] = await prisma.account.findMany({
        where: {
          userId: user.id,
          provider: "google",
        },
      });

      if (
        googleAccount &&
        googleAccount.expires_at &&
        googleAccount.expires_at * 1000 < Date.now()
      ) {
        // If the access token has expired, try to refresh it
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: googleAccount.refresh_token!,
            }),
          });
          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          await prisma.account.update({
            data: {
              access_token: newTokens.access_token,
              expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
              refresh_token:
                newTokens.refresh_token ?? googleAccount.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: googleAccount.providerAccountId,
              },
            },
          });
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          session.error = "RefreshError";
        }
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshError";
  }
}
