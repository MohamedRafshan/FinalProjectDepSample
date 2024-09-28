import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";
import SettingForm from "./components/settingForm";

const SettingPage = async({params}) => {

    const {userId} = auth();

    if (!userId) {
        return null;
    }

    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            ownerId: userId
        }
    });

    const seller = await prisma.seller.findFirst({
        where: {
            storeId: params.storeId,
            sellerid: userId        //sellerid is the clerk user id
        }
    })



    if (!store || !seller) {
        redirect("/");
    }

    return (  

        <div className="flex-col">
            <div   className="flex-1 space-y-4 p-8 pt-6">
                <SettingForm initialStoreData={store} initialSellerData={seller}/>
               
            </div>
            
        </div>
    );
}
 
export default SettingPage