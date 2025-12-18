import React from "react";
import { FaStar, FaRegStar, FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router";
import FavoriteButton from "./FavouriteButton";

function Card({
  id,
  title,
  description,
  priceUSD,
  brand,
  type,
  thumbnail,
  rating,
  className,
}) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 text-xs" />
      );
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 text-xs" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-gray-300 text-xs" />
      );
    }

    return stars;
  };

  return (
    <div
      className={`relative w-58 h-[360px] flex flex-col justify-between rounded-xl hover:-translate-y-1.5 bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out group overflow-hidden ${className}`}
    >
      {/* Image Section */}
      <div className="relative w-full h-40 flex justify-center items-center bg-gradient-to-b from-blue-100 to-white p-4 group-hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <FavoriteButton product={{ id, type, title, thumbnail, priceUSD, brand }} />
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="flex flex-col gap-2">
          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-xs">
            {renderStars(rating)}
            <span className="text-gray-500 text-xs">({rating})</span>
          </div>

          {/* Title & Description */}
          <h5 className="text-base font-semibold text-gray-800 line-clamp-1">{title}</h5>
          <p className="text-xs text-gray-500 line-clamp-2">{description}</p>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-blue-600">${priceUSD}</span>
          </div>
        </div>

        {/* Brand & Button */}
        <div className="flex justify-between items-center mt-auto">
          <span className="bg-gray-100 text-gray-700 text-[8px] font-semibold px-2 py-1 rounded-full">
            {brand}
          </span>
          <NavLink
            to={`/${type}/${id}`}
            className="flex items-center gap-1 text-[10px] font-semibold rounded-full px-3 py-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View Details <FaArrowRight className="text-[10px]" />
          </NavLink>
        </div>
      </div>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-600 transform origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left"></div>
    </div>
  );
}

export default Card;