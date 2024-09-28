

const getSearchProducts = async(location, category) => {
    const url = process.env.DOMAIN_URL
    const res = await fetch(`${"http://localhost:3000/"}/api/buyer/getSearchProducts?location=${location}&category=${category}`); 
    return res.json()
}

export default getSearchProducts;
