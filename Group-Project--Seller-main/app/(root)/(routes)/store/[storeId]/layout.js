import { NavigationMenubar } from "@/components/mainNav-fontpage";
import Link from 'next/link';
import Chat from "@/components/chatBot";


const StorePageLayout = ({children}) => {
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
             <Chat/>
            {children}
        </>
     );
}
 
export default StorePageLayout;