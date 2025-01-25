import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provides";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Make your day by managing tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster closeButton position="top-center" richColors />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
