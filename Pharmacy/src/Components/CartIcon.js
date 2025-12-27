import React, { useEffect, useState } from "react";
import { GrCart } from "react-icons/gr";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/UserContext"; 

function CartIcon() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const userId = user?.id;

  const updateCartCount = async () => {
    if (!userId) {
      setCartCount(0); 
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/${userId}`);
      const cart = await res.json();
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
    } catch (err) {
      console.error("Error fetching cart count:", err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, [userId]);

  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div
      onClick={handleClick}
      className="relative text-2xl cursor-pointer hover:text-blue-600 transition-colors"
    >
      <GrCart className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold px-[4px] py-[2px] rounded-full shadow-sm leading-none">
          {cartCount}
        </span>
      )}
    </div>
  );
}

export default CartIcon;