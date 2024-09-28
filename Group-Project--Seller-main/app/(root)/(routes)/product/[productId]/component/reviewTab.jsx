'use client';

import React from 'react';
import StarRatings from "react-star-ratings";
import ProgressBar from "./progressBar";

const CustomerReviews = ({ reviews }) => {

    
    const ratingCounts = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    };

    reviews.forEach(review => {
        ratingCounts[review.rating]++;
    });

    const totalReviews = reviews.length;

    
    const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);

    return (
        <div className="flex flex-row justify-evenly place-items-end py-4">
            <div>
                <h1 className="font-bold text-xl text-gray-900 py-10">Customer Reviews ({totalReviews})</h1>
                <h1 className="font-bold text-6xl text-gray-900">{averageRating}</h1>
                <StarRatings
                    rating={averageRating | 0}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                    starDimension="15px"
                    starSpacing="0.5px"
                />
                <p className="text-sm">All from verified purchases</p>
            </div>
            <div>
                <ProgressBar value={(ratingCounts[5] / totalReviews) * 100} stars={5} reviews={ratingCounts[5]} />
                <ProgressBar value={(ratingCounts[4] / totalReviews) * 100} stars={4} reviews={ratingCounts[4]} />
                <ProgressBar value={(ratingCounts[3] / totalReviews) * 100} stars={3} reviews={ratingCounts[3]} />
                <ProgressBar value={(ratingCounts[2] / totalReviews) * 100} stars={2} reviews={ratingCounts[2]} />
                <ProgressBar value={(ratingCounts[1] / totalReviews) * 100} stars={1} reviews={ratingCounts[1]} />
            </div>
        </div>
    );
}

export default CustomerReviews;
