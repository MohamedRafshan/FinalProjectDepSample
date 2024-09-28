
const getMainCatProduct = async(subCatId,mainCategory) => {
        const Url = process.env.DOMAIN_URL
        const res = await fetch(`${Url}/api/buyer/getSameCategoryProducts/${subCatId}/${mainCategory}`);
        return res.json();
}
 
export default getMainCatProduct;