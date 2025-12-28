import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useAuth } from "../Contexts/UserContext";

function FavoriteButton({ product, className }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();
  const userId = user?.id;
  const API = process.env.REACT_APP_API_URL;

  // Fetch once per user, not per product
  useEffect(() => {
    if (!userId || !API) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${API}/favorites/${userId}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();

        const exists =
          Array.isArray(data) &&
          data.some(
            (item) =>
              String(item.product_id) === String(product.id) &&
              String(item.type) === String(product.type)
          );

        setIsFavorited(exists);
      } catch (err) {
        console.error("Favorites fetch error:", err);
      }
    };

    fetchFavorites();
  }, [userId]); // only depend on userId

  const toggleFavorite = async () => {
    if (!userId || !API) return;

    const pid = String(product.id);
    const ptype = String(product.type);

    if (isFavorited) {
      // Optimistic update: change UI immediately
      setIsFavorited(false);
      try {
        const res = await fetch(`${API}/favorites/${userId}/${pid}/${ptype}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      } catch (err) {
        console.error("Failed to remove favorite:", err);
        setIsFavorited(true); // rollback if server fails
      }
    } else {
      // Optimistic update: change UI immediately
      setIsFavorited(true);
      try {
        const res = await fetch(`${API}/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            product_id: pid,
            type: ptype,
          }),
        });
        if (!res.ok) throw new Error(`Post failed: ${res.status}`);
      } catch (err) {
        console.error("Failed to add favorite:", err);
        setIsFavorited(false); // rollback if server fails
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