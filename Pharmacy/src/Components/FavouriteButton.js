import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useAuth } from "../Contexts/UserContext";

function FavoriteButton({ product, className }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    fetch(`http://localhost:5000/favorites/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const exists = data.some(
          (item) => item.product_id === product.id && item.type === product.type
        );
        setIsFavorited(exists);
      })
      .catch((err) => console.error(err));
  }, [product]);

  const toggleFavorite = async () => {
    if (isFavorited) {
      // Frontend
      await fetch(
  `http://localhost:5000/favorites/${userId}/${product.id}/${product.type}`,
  {
    method: "DELETE",
  }
);
setIsFavorited(false);
    } else {
      await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.id,
          type: product.type,
        }),
      });
      setIsFavorited(true);
    }

    // Notify other components
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-white shadow-md hover:bg-red-200 transition-colors duration-300 ${className}`}
      aria-label="Toggle Favorite"
    >
      {isFavorited ? (
        <MdFavorite className="text-red-500 text-lg" />
      ) : (
        <MdFavoriteBorder className="text-gray-400 text-lg" />
      )}
    </button>
  );
}

export default FavoriteButton;
