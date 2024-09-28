
import Link from 'next/link';
import getTopDiscountedProducts from "@/actions/get-topDisProducts";
import Footer from "@/components/footer";
import { NavigationMenubar } from "@/components/mainNav-fontpage";
import CarouselPlugin from "@/components/ImageScrolling";
import FrontFullProducts from "@/components/frontFullProduct";
import getTopSellingProducts from "@/actions/get-topSellings";
import getTopPerformStore from "@/actions/get-topStores";
import Chat from "@/components/chatBot";


const HomePage = async() => {

  const disProducts = await getTopDiscountedProducts();
  const topSelling  = await getTopSellingProducts();
  const stores = await getTopPerformStore();
   
  return ( 
    <div >
      <div className="px-4 flex justify-between items-center bg-gray-200">
        <div className='z-10'>
            <Link href="/">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-20 h-13 cursor-pointer" 
                />
            </Link>
        </div>
          <NavigationMenubar/>
      </div>
      <CarouselPlugin />
      <FrontFullProducts initialProduct={disProducts}topSelling={topSelling} stores={stores}/>
      <Chat/>
      <Footer/>
    </div>
   );
}
 
export default HomePage;