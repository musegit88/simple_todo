import { cn } from "@/lib/utils";
import { CounterProps } from "@/types";

const Counter = ({ counts, className, title }: CounterProps) => {
  return (
    <div>
      {title === "Tasks" && counts?.getAllTasks > 0 && (
        <p className={className}>{counts?.getAllTasks}</p>
      )}
      {title === "My Day" && counts?.getMyDay > 0 && (
        <p className={className}>{counts?.getMyDay}</p>
      )}
      {title === "Important" && counts?.getImportant > 0 && (
        <p className={className}>{counts?.getImportant}</p>
      )}
      {title === "Planned" && counts?.getPlanned > 0 && (
        <p className={className}>{counts?.getPlanned}</p>
      )}
      {title === "Completed" && counts?.getCompleted > 0 && (
        <p className={className}>{counts?.getCompleted}</p>
      )}
    </div>
  );
};

export default Counter;
