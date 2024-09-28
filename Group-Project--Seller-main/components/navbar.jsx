import { UserButton } from "@clerk/nextjs";
import MainNavbar from "./mainNavbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/ui/themeToggle";
import prisma from "@/lib/prismadb";
import { StoreIcon } from "lucide-react";
import MobileMenu from "@/components/mobile-menubar";

const NavBar =async() => {
    const {userId} =auth();


    if(!userId){
        redirect("/sign-in");
    }

    const store = await prisma.Store.findFirst({
        where:{
            ownerId:userId
        }
    })

  return (
    <div className="border-b px-4">
      <div className="flex h-16 items-center px-4 justify-between">

        <div className="flex items-center justify-center space-x-3 ">
            <StoreIcon className="h-4 w-4"/>
            <h2 className="flex font-bold text-lg">{store.name}</h2>
        </div>
        <MainNavbar className="mx-6 hidden md:flex" userId={userId}/>
        <div className="ml-auto items-center space-x-4 hidden md:flex">
            <ModeToggle/>
            <UserButton afterSignOutUrl="/"/>
        </div>
        <div className="flex md:hidden cursor-pointer">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;