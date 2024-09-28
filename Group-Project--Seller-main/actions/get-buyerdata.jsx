



const getBuyerData = async(id) => {


    const url   = process.env.DOMAIN_URL
 
    const res  = await fetch(`${url}/api/buyer/getBuyer/${id}`)

    return res.json()
}
 
export default getBuyerData;