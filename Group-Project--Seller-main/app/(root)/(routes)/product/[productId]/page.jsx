
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import getProduct from "@/actions/get-product";
import Info from "./component/info";
import CustomerReviews from "./component/reviewTab";
import getSubCatProducts from "@/actions/get-subCatProducts";
import SubCatProducts from "@/components/buyer-components/subCatList";
import getMainCatProduct from "@/actions/get-mainCatProducts";
import getSeller from "@/actions/get-seller";
import getReviews from "@/actions/get-reviews";
import ReviewsList from "./component/reviews";
import Footer from "@/components/footer";



const ProductPage = async({params}) => {


    const data = await getProduct(params.productId);  

    const reviews = await getReviews(params.productId);


    const subproducts = await getSubCatProducts(data.categoryId);
    const mainCat = await getMainCatProduct(data.categoryId,data.mainCategory);

    const subFilteredProduct = subproducts.filter((product)=>product.id !== data.id);
    const combinedProducts = subFilteredProduct.concat(mainCat);
    


    return ( 
      <>
        <div className="px-4">
          <Info product={data}/>
          <CustomerReviews reviews={reviews}/>
          <Tabs defaultValue="products" className="w-full mt-6 px-12">
            <TabsList>
              <TabsTrigger value="products">RelatedProducts</TabsTrigger>
              <TabsTrigger value="reviews">Reviews({reviews.length})</TabsTrigger>
            </TabsList>
              <TabsContent value="products" >
                <SubCatProducts plist={combinedProducts} />
              </TabsContent>
              <TabsContent value="reviews">
                <ReviewsList reviews={reviews}/>
              </TabsContent>
          </Tabs>
        </div>
        <Footer/>
        </>
     );
}
 
export default ProductPage;