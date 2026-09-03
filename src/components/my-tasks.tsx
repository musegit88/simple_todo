"use client";

import { ElementRef, ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { Tasks } from "@prisma/client";
import Empty from "@/components/empty";
import { DragHandleProps, MyTasksProps } from "@/types";
import TaskCard from "@/components/task-card";
import { useTaskIds } from "../hooks/useTaskIds";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, handleTaskIds } from "@/lib/utils";
import { useOptimisticTask } from "../hooks/useOptimisticTask";
import OptimisticTaskCard from "./optimistic-task-card";
import { moveTask } from "@/app/_actions/tasks.action";

const SortableRow = ({
  task,
  children,
}: {
  task: Tasks;
  children: (dragHandleProps: DragHandleProps) => ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners })}
    </div>
  );
};

const MyTasks = ({
  data,
  isCompleted,
  characters,
  lists,
  scope,
}: MyTasksProps) => {
  const { taskIds, setTaskIds } = useTaskIds();
  const { optimisticTask } = useOptimisticTask();
  const scrollRef = useRef<ElementRef<"div">>(null);

  // Local copy so drag reorder is instant; resynced whenever the server
  // sends fresh data (e.g. after revalidation).
  const [items, setItems] = useState<Tasks[]>(data);
  useEffect(() => {
    setItems(data);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.length]);

  useEffect(() => {
    if (taskIds.length === 1) {
      toast.info("Please select another task");
    }
  }, [taskIds.length]);
  useEffect(() => {
    if (data.length > 0) {
      // Clear optimistic tasks when new data arrives
      useOptimisticTask.getState().setOptimisticTask([]);
    }
  }, [data.length]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((t) => t.id === active.id);
    const newIndex = items.findIndex((t) => t.id === over.id);
    const reorderd = arrayMove(items, oldIndex, newIndex);

    const movedTask = reorderd[newIndex];
    const beforeKey =
      (reorderd[newIndex - 1]?.[scope!] as string | undefined) ?? null;
    const afterKey =
      (reorderd[newIndex + 1]?.[scope!] as string | undefined) ?? null;

    setItems(reorderd);
    try {
      const newKey = await moveTask(
        movedTask.id,
        movedTask.userId,
        scope!,
        beforeKey,
        afterKey,
      );
      // keep local state's key in sync so a second consecutive drag
      // (before the server round-trip finishes) computes correctly
      setItems((cur) =>
        cur.map((t) =>
          t.id === movedTask.id ? { ...t, [scope!]: newKey } : t,
        ),
      );
      toast.success("Task position updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save the new position");
      setItems(items); //rollbacl on failure
    }
  };

  const renderRow = (task: Tasks, dragHandleProps?: DragHandleProps) => (
    <div key={task.id} className="flex items-center gap-1 md:gap-2">
      {items.length > 1 && (
        <div className="self-start py-3">
          <Checkbox
            checked={taskIds.includes(task.id)}
            onCheckedChange={(checked) =>
              handleTaskIds(checked, task.id, setTaskIds, taskIds)
            }
          />
        </div>
      )}
      <TaskCard
        key={task.id}
        task={task}
        characters={characters}
        lists={lists}
        isChecked={taskIds.includes(task.id)}
        dragHandleProps={dragHandleProps}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <div ref={scrollRef} />
      {optimisticTask &&
        optimisticTask.map((task) => (
          <div
            className={cn(data.length > 1 ? "ml-6" : "")}
            key={task.id || task.name}
          >
            <OptimisticTaskCard
              key={task.id || task.name}
              optimisticTask={task}
            />
          </div>
        ))}
      {scope ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((task) => (
              <SortableRow key={task.id} task={task}>
                {(dragHandleProps) => renderRow(task, dragHandleProps)}
              </SortableRow>
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        items.map((task) => <div key={task.id}>{renderRow(task)}</div>)
      )}

      {items.length === 0 && optimisticTask.length === 0 && (
        <Empty isCompleted={isCompleted} />
      )}
    </div>
  );
};

export default MyTasks;
