
const getSeller = async(storeId) => {

    const Url = process.env.DOMAIN_URL
    const res = await fetch(`${Url}/api/buyer/getStore/${storeId}/getSeller`)
    return res.json()
    
}
 
export default getSeller;