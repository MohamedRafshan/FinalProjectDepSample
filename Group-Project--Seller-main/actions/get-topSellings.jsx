


const getTopSellingProducts = async() => {


    const Url = process.env.DOMAIN_URL
    const res = await fetch(`${Url}/api/buyer/getTopSelling`)
    return res.json()

    
}
 
export default getTopSellingProducts;