import { CounterProps } from "@/types";

const Counter = ({ counts, title }: CounterProps) => {
  return (
    <div>
      {title === "Tasks" && counts?.getAllTasks > 0 && (
        <p className="counter_badge">{counts?.getAllTasks}</p>
      )}
      {title === "My Day" && counts?.getMyDay > 0 && (
        <p className="counter_badge">{counts?.getMyDay}</p>
      )}
      {title === "Important" && counts?.getImportant > 0 && (
        <p className="counter_badge">{counts?.getImportant}</p>
      )}
      {title === "Planned" && counts?.getPlanned > 0 && (
        <p className="counter_badge">{counts?.getPlanned}</p>
      )}
      {title === "Completed" && counts?.getCompleted > 0 && (
        <p className="counter_badge">{counts?.getCompleted}</p>
      )}
    </div>
  );
};

export default Counter;
