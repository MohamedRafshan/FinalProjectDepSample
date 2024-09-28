

import { ProductPreview } from "@/components/buyer-components/expand-view";



const MainPageLayout = ({children}) => {
    return ( 
        <>
        <ProductPreview/>
        {children}
        </>
     );
}
 
export default MainPageLayout;