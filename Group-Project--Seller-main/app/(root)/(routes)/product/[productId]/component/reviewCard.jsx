'use client'


import StarRatings from "react-star-ratings";

const ReviewCart = ({data}) => {


    return ( 
        <div className="flex w-3/5 bg-gray-200 rounded-sm p-2 flex-col my-2">
            <h2 className="font-semibold text-gray-800">Anonymous User</h2>
            <StarRatings
                    rating={parseFloat(data.rating)}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                    starDimension="15px"
                    starSpacing="0.5px"
                />
            <div className="bg-gray-300 p-2 rounded-lg mt-2 flex flex-col text-sm">
                {data.comment}
            </div>

        </div>
     );
}
 
export default ReviewCart;