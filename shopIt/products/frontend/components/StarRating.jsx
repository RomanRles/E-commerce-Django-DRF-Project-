// Implement stars translating
import { useState } from "react";
import { useEffect } from "react";
import { Star } from "./Star";

function StarRating({ rating }) {
    const numericRating = Number(rating);

    const fullStars = Math.floor(numericRating);
    const partialStar = numericRating - fullStars;
    const emptyStars = 5 - Math.ceil(numericRating);

 return (
    <div className="">

            {Array.from({ length: fullStars }).map((_, index) => (
                <Star
                    key={`full-${index}`}
                    index={index}
                    fill={1}
                />
            ))}

            {partialStar > 0 && (
                <Star
                    index={fullStars}
                    fill={partialStar}
                />
            )}

            {Array.from({ length: emptyStars }).map((_, index) => (
                <Star
                    key={`empty-${index}`}
                    index={fullStars + index + 1}
                    fill={0}
                />
            ))}

        </div>
 );
}

export { StarRating };