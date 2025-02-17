import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 inset-0 bg-background z-50">
      <div className="flex justify-center items-center h-full">
        <LoaderCircle className="animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
