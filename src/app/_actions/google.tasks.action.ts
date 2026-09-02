"use server";

import { prisma } from "@/lib/prisma-client";
import { taskUpdateFormSchema } from "@/validator/task-update-schema";
import { endOfToday } from "date-fns";
import { google } from "googleapis";
import { GaxiosError } from "gaxios";
import { z } from "zod";

export const getOAuthClient = async (userId: string) => {
  const token = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      accounts: {
        select: {
          access_token: true,
          refresh_token: true,
        },
      },
    },
  });

  if (!token || !token.accounts || !token.accounts[0]?.access_token) {
    return;
  }

  const client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.AUTH_GOOGLE_REDIRECT_URI,
  );
  client.setCredentials({ access_token: token?.accounts[0].access_token });
  return client;
};

export const createGoogleTask = async (
  userId: string,
  googleTaskIntegration: boolean,
  name: string,
  duedate: Date,
) => {
  const oAuthClient = await getOAuthClient(userId);
  if (!googleTaskIntegration) {
    return;
  }
  const create = await google.tasks({ version: "v1" }).tasks.insert({
    auth: oAuthClient,
    tasklist: "@default",
    requestBody: {
      title: name,
      due: duedate ? duedate.toISOString() : endOfToday().toISOString(),
    },
  });
  return create.data;
};

export const updateGoogleTask = async (
  values: z.infer<typeof taskUpdateFormSchema>,
) => {
  const { name, taskId, userId, date, description, googleTaskId } = values;
  const oAuthClient = await getOAuthClient(userId);

  await google.tasks({ version: "v1" }).tasks.update({
    auth: oAuthClient,
    tasklist: "@default",
    task: googleTaskId!,
    requestBody: {
      title: name,
      id: googleTaskId,
      due: date ? date.toISOString() : endOfToday().toISOString(),
    },
  });
};

export const deleteGoogleTask = async (
  userId: string,
  googleTaskId: string,
) => {
  const oAuthClient = await getOAuthClient(userId);

  await google.tasks({ version: "v1" }).tasks.delete({
    auth: oAuthClient,
    tasklist: "@default",
    task: googleTaskId,
  });
};

export const markGoogleTaskCompleted = async (
  userId: string,
  googleTaskId: string,
) => {
  const oAuthClient = await getOAuthClient(userId);
  const isTaskAvailable = await checkIfTaskAvailable(googleTaskId, userId);
  if (isTaskAvailable) {
    await google.tasks({ version: "v1" }).tasks.patch({
      auth: oAuthClient,
      tasklist: "@default",
      task: googleTaskId,
      requestBody: {
        status: "completed",
        id: googleTaskId,
      },
    });
  }
};

export const unmarkGoogleTaskCompleted = async (
  userId: string,
  googleTaskId: string,
) => {
  const oAuthClient = await getOAuthClient(userId);
  const isTaskAvailable = await checkIfTaskAvailable(googleTaskId, userId);
  if (isTaskAvailable) {
    await google.tasks({ version: "v1" }).tasks.patch({
      auth: oAuthClient,
      tasklist: "@default",
      task: googleTaskId,
      requestBody: {
        status: "normal",
        id: googleTaskId,
      },
    });
  }
};

export const enableGoogleIntegration = async (userId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      googleTaskIntegration: true,
    },
  });
};

export const disableGoogleIntegration = async (userId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      googleTaskIntegration: false,
    },
  });
};

const checkIfTaskAvailable = async (googleTaskId: string, userId: string) => {
  const oAuthClient = await getOAuthClient(userId);

  try {
    const response = await google.tasks({ version: "v1" }).tasks.get({
      auth: oAuthClient,
      tasklist: "@default",
      task: googleTaskId,
    });

    return true;
  } catch (error: unknown) {
    if (error instanceof GaxiosError) {
      if (error.status === 404 || error.response?.status === 404) {
        return false;
      } else {
        console.error("Google API Error:", error.message);
        throw error;
      }
    } else {
      // Handle standard JS errors or other unexpected throws
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
