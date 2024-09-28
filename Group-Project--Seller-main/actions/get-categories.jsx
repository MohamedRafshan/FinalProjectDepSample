


const getCategories = async(storeId) => {
    const Url = process.env.DOMAIN_URL
    const res = await fetch(`${Url}/api/buyer/getStore/${storeId}/getCategories`) 
    return res.json()
}
 
export default getCategories;