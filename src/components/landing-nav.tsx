import Link from "next/link";
import Image from "next/image";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const LandingNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b broder-2 bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <div className="container flex items-center justify-between mx-auto p-4 md:px-6 ">
        <Link href={"/"} className="flex items-center space-x-2">
          <h2 className="font-bold">Simple</h2>
          <Image src={"/icon-192x192.png"} alt="Logo" width={40} height={40} />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href={"/signin"}>
            <Button className="text-white bg-blue-500 hover:bg-blue-600">
              Log in
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default LandingNav;
