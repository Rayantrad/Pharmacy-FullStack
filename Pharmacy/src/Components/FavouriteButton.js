import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useAuth } from "../Contexts/UserContext";

function FavoriteButton({ product, className }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/favorites/${userId}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const exists = data.some(
            (item) => item.product_id === product.id && item.type === product.type
          );
          setIsFavorited(exists);
        }
      } catch (err) {
        console.error("Favorites fetch error:", err);
      }
    };

    fetchFavorites();
  }, [product, userId]);

  const toggleFavorite = async () => {
    if (!userId) return;

    if (isFavorited) {
      // Optimistic update: change UI immediately
      setIsFavorited(false);

      try {
        await fetch(
          `${process.env.REACT_APP_API_URL}/favorites/${userId}/${product.id}/${product.type}`,
          { method: "DELETE" }
        );
      } catch (err) {
        console.error("Failed to remove favorite:", err);
        // rollback if server fails
        setIsFavorited(true);
      }
    } else {
      // Optimistic update: change UI immediately
      setIsFavorited(true);

      try {
        await fetch(`${process.env.REACT_APP_API_URL}/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            product_id: product.id,
            type: product.type,
          }),
        });
      } catch (err) {
        console.error("Failed to add favorite:", err);
        // rollback if server fails
        setIsFavorited(false);
      }
    }

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