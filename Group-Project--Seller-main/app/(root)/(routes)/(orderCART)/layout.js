
import prisma from "@/lib/prismadb";
import { NavigationMenubar } from "@/components/mainNav-fontpage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Chat from "@/components/chatBot";
import Footer from "@/components/footer";

const cartLayout = async({children}) => {

    const {userId} = auth();
   
    if(!userId){
        return redirect("/sign-in");
    }

    const buyerExist = await prisma.buyer.findFirst({
      where:{
          userId
      }
    });

    if(!buyerExist){
        return redirect("/sign-in");
    }

    return (
        <>
         <div className="px-4 flex justify-between items-center bg-gray-200">
            <Link href="/">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-20 h-13 cursor-pointer" 
                />
            </Link>
            <NavigationMenubar/>
        </div>
        <div className="px-10">
            <Chat/>
            {children}
        </div>
        <Footer/>
        </>
      );
}
 
export default cartLayout;