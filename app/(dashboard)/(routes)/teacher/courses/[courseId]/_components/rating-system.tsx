import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState, useLayoutEffect, useCallback, useMemo } from "react";

/* 
   The RatingSystem component is a reusable React component that allows users to rate 
   items by clicking on stars, with the ability to customize the number of stars displayed. 
   Thanks for the opportunity :) 
*/

// Defining props interface for RatingSystem component
interface RatingSystemProps {
  setRating: any; // Function to set the rating
  rating: number; // Current rating value
  numOfStars: number; // Number of stars to display (default is 5)
}

// RatingSystem component definition
export const RatingSystem = ({
  rating,
  setRating,
  numOfStars = 5,
}: RatingSystemProps) => {
  // State to manage the array of stars and hovered state
  const [stars, setStars] = useState<number[]>([]);
  const [hovered, setHovered] = useState(0);

  // useLayoutEffect hook to update stars array when numOfStars prop changes
  useLayoutEffect(() => {
    const starsArray = [];
    let starCount = numOfStars || 5;

    for (let i = 1; i <= starCount; i++) {
      starsArray.push(i);
    }

    setStars(starsArray);
  }, [numOfStars]);

  // Function to update the rating when a star is clicked
  const updateRating = (star: number) => {
    rating === star ? setRating(0) : setRating(star);
  };

  // Memoized function to render each individual star
  const renderedStar = useCallback(
    (star: number) => {
      return rating < star ? (
        hovered < star ? (
          <FaRegStar /> // Render empty star when not rated and not hovered
        ) : (
          <FaStar /> // Render filled star when not rated but hovered
        )
      ) : hovered < star && hovered != 0 ? (
        <FaRegStar /> // Render empty star when rated but not hovered
      ) : (
        <FaStar /> // Render filled star when rated and hovered
      );
    },
    [rating, hovered]
  );

  // Memoized stars view to avoid unnecessary re-renders
  const starsView = useMemo(
    () =>
      stars.map((star) => (
        <span
          key={star}
          className="star"
          onClick={() => updateRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          {renderedStar(star)} {/* Render each star */}
        </span>
      )),
    [stars, updateRating]
  );

  // Return the stars view wrapped in a div with specific styling
  return <div className="mb-4 flex text-emerald-700">{starsView}</div>;
};
