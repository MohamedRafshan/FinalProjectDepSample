'use client'


import React from 'react';
import ReviewCart from './reviewCard';

const ReviewsList = ({reviews=[]}) => {

    return ( 
        <>
            { reviews.map((item, index) => (
                <div key={index}>
                    <ReviewCart data={item}/>
                </div>
            ))}
        </>


     );
}
 
export default ReviewsList;