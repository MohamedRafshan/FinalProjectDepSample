
const getReviews = async(id) => {
    
    const Url = process.env.DOMAIN_URL
    const res = await fetch(`${Url}/api/buyer/getReviews?productId=${id}`);
    return res.json();
}
export default getReviews;