import CreateList from "@/components/create-list";
import ListCard from "@/components/list-card";
import { MobileListProps } from "@/types";

const MobileLists = ({ lists, userId }: MobileListProps) => {
  return (
    <div className="md:hidden w-full h-72 overflow-hidden">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <h1>Lists</h1>
            <p className="counter_badge">{lists.length}</p>
          </div>
          <CreateList userId={userId} />
        </div>
        <div className="flex flex-col space-y-4 overflow-y-auto">
          {lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileLists;
