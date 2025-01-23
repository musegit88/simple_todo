"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { endOfToday } from "date-fns";

import { prisma } from "@/lib/prisma-client";
import { taskFormSchema } from "@/validator/task-form-schema";
import { taskUpdateFormSchema } from "@/validator/task-update-form";
import { getListNameById } from "./list.actions";

// Create task
export const createTask = async (values: z.infer<typeof taskFormSchema>) => {
  const { name, date, dynamicPath, listId, userId, path } = values;
  if (path === "/my-day") {
    await prisma.tasks.create({
      data: {
        name,
        duedate: endOfToday(),
        myday: true,
        userId,
      },
    });
    return { message: "Task created successfully in My Day" };
  } else if (path === "/important") {
    await prisma.tasks.create({
      data: {
        name,
        duedate: date === undefined ? new Date() : date,
        important: true,
        userId,
      },
    });
    return { message: "Task created successfully in Important" };
  } else if (path === dynamicPath) {
    const listName = await getListNameById(listId!);
    await prisma.tasks.create({
      data: {
        name,
        duedate: date === undefined ? endOfToday() : date,
        listId: listId,
        userId,
      },
    });
    return { message: `Task created successfully in ${listName?.name}` };
  } else {
    await prisma.tasks.create({
      data: {
        name,
        duedate: date === undefined ? endOfToday() : date,
        userId,
      },
    });
    return { message: "Task created successfully" };
  }
};

// Get all tasks except completed
export const getTasks = async (userId: string) => {
  const tasks = await prisma.tasks.findMany({
    where: {
      userId: userId,
      completed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return tasks;
};

// Get completed tasks
export const getCompletedTasks = async (userId: string) => {
  const tasks = await prisma.tasks.findMany({
    where: {
      userId: userId,
      completed: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return tasks;
};

// Search task
export const getSearchedTask = async (searchWord: string, userId: string) => {
  const tasks = await prisma.tasks.findMany({
    where: {
      userId: userId,
      OR: [
        {
          name: {
            contains: searchWord,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks;
};

// Update tasks
export const updateTaskById = async (
  values: z.infer<typeof taskUpdateFormSchema>
) => {
  const { name, taskId, userId, date, description } = values;
  const tasks = await prisma.tasks.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      description: description,
      duedate: date,
      name: name,
      myday: false,
    },
  });
  revalidatePath("/,/myday,/planned");
  return { message: `${name} updated successfully` };
};

// Get Planned
export const getPlanned = async (userId: string) => {
  const planned = await prisma.tasks.findMany({
    where: {
      userId: userId,
      duedate: { gt: endOfToday() },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return planned;
};

// Get my day
export const getMyDay = async (userId: string) => {
  const myDay = await prisma.tasks.findMany({
    where: {
      userId: userId,
      myday: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return myDay;
};

// Add to my day
export const addtoMyDay = async (taskId: string, userId: string) => {
  await prisma.tasks.update({
    where: {
      userId: userId,
      id: taskId,
    },
    data: {
      myday: true,
    },
  });
  revalidatePath("/my-day");
};

// Remove my day
export const removeMyDay = async (taskId: string, userId: string) => {
  await prisma.tasks.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      myday: false,
    },
  });
  revalidatePath("/my-day");
};

// Mark as important
export const markAsImportant = async (taskId: string, userId: string) => {
  await prisma.tasks.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      important: true,
    },
  });
  revalidatePath("/important");
};

// Remove important
export const removeImportant = async (taskId: string, userId: string) => {
  await prisma.tasks.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      important: false,
    },
  });
  revalidatePath("/important");
};

// Get importants
export const getImportants = async (userId: string) => {
  const importants = await prisma.tasks.findMany({
    where: {
      userId: userId,
      important: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return importants;
};

// Mark as completed
export const markAsCompleted = async (taskId: string, userId: string) => {
  const completed = await prisma.tasks.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      completed: true,
    },
  });
  revalidatePath("/");
  revalidatePath("/completed");
  return completed;
};

// Remove as completed
export const removeCompleted = async (taskId: string, userId: string) => {
  await prisma.tasks.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      completed: false,
    },
  });
  revalidatePath("/");
  revalidatePath("/completed");
};

// Delete task
export const deleteTask = async (taskId: string, userId: string) => {
  await prisma.tasks.delete({
    where: {
      id: taskId,
      userId: userId,
    },
  });
  revalidatePath("/");
};

// Task counter
export const allCounts = async (userId: string) => {
  const getAllTasks = await prisma.tasks.count({ where: { userId: userId } });

  const getMyDay = await prisma.tasks.count({
    where: {
      userId: userId,
      myday: true,
    },
  });
  const getImportant = await prisma.tasks.count({
    where: {
      userId: userId,
      important: true,
    },
  });
  const getPlanned = await prisma.tasks.count({
    where: {
      userId: userId,
      duedate: { gt: endOfToday() },
    },
  });
  const getCompleted = await prisma.tasks.count({
    where: {
      userId,
      completed: true,
    },
  });
  return { getAllTasks, getMyDay, getImportant, getPlanned, getCompleted };
};
