

const getStore = async(storeId) => {

    const Url = process.env.DOMAIN_URL
    const res = await fetch(`${Url}/api/buyer/getStore/${storeId}`)
    return res.json()


}
 
export default getStore;