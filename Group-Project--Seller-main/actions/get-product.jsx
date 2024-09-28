

const getProduct = async(productId) => {

    const url = process.env.DOMAIN_URL
    const product = await fetch(`${url}/api/buyer/getProduct/${productId}`);
    return product.json();

}
 
export default getProduct;