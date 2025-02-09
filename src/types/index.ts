import { List, Tasks, User } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type AddToListProps = {
  lists?: ListType[];
  task: Tasks;
};
export type ContextMenuContentProps = {
  task: Tasks;
};

export type CompletedTasksProps = {
  completedTasks: Tasks[];
  lists: ListType[];
};

export type CounterProps = {
  counts: {
    getAllTasks: number;
    getMyDay: number;
    getImportant: number;
    getPlanned: number;
    getCompleted: number;
  };
  title: string;
};

export type CreateListProps = {
  userId: string;
};

export type CreateListFromProps = {
  userId: string;
};

export type DatePickerProps = {
  date: Date | undefined;
  setDate: any;
};

export type DeleteListProps = {
  listId: string;
  listName: string;
  listColor: string | undefined;
};

export type DeleteTaskProps = {
  task: Tasks;
};

export type DetailsProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  task: Tasks;
};

export type EmptyProps = {
  isCompleted?: boolean;
};

export type HeaderProps = {
  title?: string;
  color?: string;
  listPath?: string;
  listIcon?: string;
};

export type IconPickerProps = {
  icon: string;
  setIcon: Dispatch<SetStateAction<string | undefined>>;
};

export type ListCardProps = {
  list: ListType;
};

export type ListType = {
  _count: {
    tasks: number;
  };
  userId: string;
  id: string;
  name: string;
  icon: string | undefined;
  color: string | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export type ListProps = {
  lists: ListType[];
  userId: string;
  setShow?: Dispatch<SetStateAction<boolean>>;
};

export type MobileCreateTaskProps = {
  userId: string | undefined;
};

export type MobileListProps = {
  lists: ListType[];
  userId: string;
  setShow?: Dispatch<SetStateAction<boolean>>;
};

export type MobileDetailsProps = {
  task: Tasks;
  showMobile: boolean;
  setShowMobile: Dispatch<SetStateAction<boolean>>;
};

export type MoileNavigationProps = {
  counts: {
    getAllTasks: number;
    getMyDay: number;
    getImportant: number;
    getPlanned: number;
    getCompleted: number;
  };
};

export type MobileSidebarProps = {
  show?: boolean;
  setShow: any;
  counts: {
    getAllTasks: number;
    getMyDay: number;
    getImportant: number;
    getPlanned: number;
    getCompleted: number;
  };
  lists: ListType[];
  user: UserProps;
};

export type MyTasksProps = {
  data: Tasks[];
  lists?: ListType[];
  isCompleted?: boolean;
  characters?: string;
};

export type NavbarProps = {
  counts: {
    getAllTasks: number;
    getMyDay: number;
    getImportant: number;
    getPlanned: number;
    getCompleted: number;
  };
  lists: ListType[];
  user: UserProps;
};

export type serachbarProps = {
  show?: boolean;
  setShow?: any;
};

export type SidebarProps = {
  counts: {
    getAllTasks: number;
    getMyDay: number;
    getImportant: number;
    getPlanned: number;
    getCompleted: number;
  };
  userId: string;
  lists: ListType[];
};

export type TaskCardContentProps = {
  task: Tasks;
  characters: string | undefined;
};

export type TaskFormProps = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

export type TaskProps = {
  task: Tasks;
  lists?: ListType[];
  characters?: string;
};

export type ToggleCompleteProps = {
  task: Tasks;
};

export type ToggleDetailsProps = {
  task: Tasks;
  showMobile: boolean;
  setShowMobile: Dispatch<SetStateAction<boolean>>;
};

export type ToggleImportantProps = {
  task: Tasks;
};

export type ToggleMydayProps = {
  task: Tasks;
};

export type ToggleSidebarProps = {
  color?: string;
  counts: {
    getAllTasks: number;
    getMyDay: number;
    getImportant: number;
    getPlanned: number;
    getCompleted: number;
  };
  lists: ListType[];
  user: UserProps;
};

export type UpdateListFromProps = {
  list: {
    _count: {
      tasks: number;
    };
  } & {
    userId: string;
    id: string;
    name: string;
    icon: string | undefined;
    color: string | undefined;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateListProps = {
  list: {
    _count: {
      tasks: number;
    };
  } & {
    userId: string;
    id: string;
    name: string;
    icon: string | undefined;
    color: string | undefined;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UserComponentProps = {
  user: UserProps;
};

export type UserProps = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

export type UpdateTaskFormProps = {
  task: Tasks;
  setShow: Dispatch<SetStateAction<boolean>>;
};
