import React from "react";
import { FaRegStar, FaRegStarHalf, FaStar } from "react-icons/fa";

interface RatingProps {
  value: number;
  text?: string;
}

export const Rating: React.FC<RatingProps> = ({ value, text }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    return (
      <span key={index} className="text-emerald-700">
        {value >= starValue ? (
          <FaStar />
        ) : value >= starValue - 0.5 ? (
          <FaRegStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });

  return (
    <div className="review-rating ">
      <div className="flex">{stars}</div>
      {text && <span className="rating-text">{text}</span>}
    </div>
  );
};
