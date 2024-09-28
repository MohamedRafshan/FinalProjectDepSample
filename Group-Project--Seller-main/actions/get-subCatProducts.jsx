
const getSubCatProducts = async(id) => {
    
    const Url = process.env.DOMAIN_URL
    const res = await fetch(`${Url}/api/buyer/getSameCategoryProducts/${id}`);
    return res.json();
}
export default getSubCatProducts;