import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState, useLayoutEffect, useCallback, useMemo } from "react";

interface RatingSystemProps {
  setRating: any;
  rating: number;
  numOfStars: number;
}

export const RatingSystem = ({
  rating,
  setRating,
  numOfStars = 5,
}: RatingSystemProps) => {
  const [stars, setStars] = useState<number[]>([]);
  const [hovered, setHovered] = useState(0);

  useLayoutEffect(() => {
    const starsArray = [];
    let starCount = numOfStars || 5;

    for (let i = 1; i <= starCount; i++) {
      starsArray.push(i);
    }

    setStars(starsArray);
  }, [numOfStars]);

  const updateRating = (star: number) => {
    rating === star ? setRating(0) : setRating(star);
  };

  const renderedStar = useCallback(
    (star: number) => {
      return rating < star ? (
        hovered < star ? (
          <FaRegStar />
        ) : (
          <FaStar />
        )
      ) : hovered < star && hovered != 0 ? (
        <FaRegStar />
      ) : (
        <FaStar />
      );
    },
    [rating, hovered]
  );

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
          {renderedStar(star)}
        </span>
      )),
    [stars, updateRating]
  );

  return <div className="mb-4 flex text-emerald-700">{starsView}</div>;
};
