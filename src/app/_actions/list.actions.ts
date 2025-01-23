"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma-client";
import { createListSchema } from "@/validator/create-list-schema";
import { updateListSchema } from "@/validator/update-list-schema";
import { ListProps, ListType } from "@/types";

// create list
export const createList = async (values: z.infer<typeof createListSchema>) => {
  const { name, userId, icon } = values;
  await prisma.list.create({
    data: {
      name,
      icon,
      userId,
    },
  });
};

// delete list
export const deleteList = async (listId: string) => {
  await prisma.list.delete({
    where: {
      id: listId,
    },
  });
};

// update list
export const updateList = async (values: z.infer<typeof updateListSchema>) => {
  const { listName, listIcon, listId, userId } = values;
  await prisma.list.update({
    where: {
      id: listId,
      userId,
    },
    data: {
      name: listName,
      icon: listIcon,
    },
  });
};

// get lists
export const allLists = async (userId: string) => {
  const lists = await prisma.list.findMany({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          tasks: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return lists;
};

// add task to list
export const addTaskToList = async (
  taskId: string,
  listId: string,
  userId: string
) => {
  await prisma.tasks.update({
    where: {
      id: taskId,
      userId,
    },
    data: {
      listId: listId,
    },
  });
};

// remove task from list
export const removeTaskFromList = async (userId: string, taskId: string) => {
  await prisma.tasks.update({
    where: {
      id: taskId,
      userId,
    },
    data: {
      listId: null,
    },
  });
};

// get list by id
export const getListById = async (listId: string, userId: string) => {
  const list = await prisma.list.findUnique({
    where: {
      id: listId,
      userId,
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });
  return list;
};

// find list name by id
export const getListNameById = async (listId: string) => {
  if (listId) {
    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });
    return list;
  }
};
