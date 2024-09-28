
'use client'
import {ProductCard} from "@/components/buyer-components/product-card";

const SubCatProducts = ({plist =[]}) => {

    if(!plist.length) return null;

    return ( 
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 space-y-2 items-center">
            {plist.map((product, index)=>(
                <ProductCard key={index} product={product} />
            ))}
        </div>
     );
}
 
export default SubCatProducts;