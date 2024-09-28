


const getTopPerformStore = async() => {


    const Url = process.env.DOMAIN_URL
    const res = await fetch(`${Url}/api/buyer/getTopStores`)
    return res.json()

    
}
 
export default getTopPerformStore;