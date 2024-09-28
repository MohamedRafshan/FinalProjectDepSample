

import getBuyerData from "@/actions/get-buyerdata";
import DelivaryDetails from "./components/delivary-details";
import BuyerRegModal from "@/components/modals/delivary-modal";
import ItemList from "./components/itemlist";
import Summery from "./components/summery";


export const revalidate =0;

const CartPage = async({params}) => {

    const buyer = await getBuyerData(params.userId);

    return ( 
        <>
        <div className="flex flex-col items-center md:items-start md:flex-row pr-14 px-12">
            <div className="w-full md:w-3/5">
                <BuyerRegModal initialdata={buyer}/>
                <DelivaryDetails
                    buyer={buyer}
                />
                <h1 className="font-bold text-xl px-4">Shopping Cart Items</h1>
                <ItemList/>
            </div>
            <div className="w-full md:w-2/5">
                <Summery buyer={buyer}/>
            </div>
        </div>
        </>
     );
}
 
export default CartPage;