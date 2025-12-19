import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAuth } from "../Contexts/UserContext";

function AddToCartPanel({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [currentStock, setCurrentStock] = useState(0);
  const [cartMessage, setCartMessage] = useState("");
  const { user } = useAuth();
  const userId = user?.id;

  // Load current stock considering items already in cart
  useEffect(() => {
    if (product && userId) {
      fetch(`http://localhost:5000/cart/${userId}`)
        .then((res) => res.json())
        .then((cart) => {
          const existingItem = cart.find(
            (item) => item.product_id === product.id
          );
          const usedStock = existingItem ? existingItem.quantity : 0;
          setCurrentStock(product.stock - usedStock);
        })
        .catch((err) => console.error("Error fetching cart:", err));
    } else {
      setCurrentStock(product?.stock || 0); 
    }
  }, [product, userId]); 

  const increaseQuantity = () => {
    if (quantity < currentStock) setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Add to cart via backend
  const handleAddToCart = async () => {
    if (!userId) {
      setCartMessage("Please log in to add items");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.id,
          quantity,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCartMessage(` ${data.error}`);
        return;
      }

      // Refresh cart info
      const cartRes = await fetch(`http://localhost:5000/cart/${userId}`);
      const cart = await cartRes.json();
      const existingItem = cart.find((item) => item.product_id === product.id);
      const usedStock = existingItem ? existingItem.quantity : 0;
      setCurrentStock(product.stock - usedStock);

      setQuantity(1);
      setCartMessage(`Added ${quantity} to cart`);
      window.dispatchEvent(new Event("cartUpdated"));
      setTimeout(() => setCartMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setCartMessage("Could not add to cart");
    }
  };

  return (
    <div className="mt-4">
      <p className="text-sm font-medium mb-2">
        Stock:{" "}
        <span
          className={currentStock > 0 ? "text-green-600" : "text-red-600"}
        >
          {currentStock > 0
            ? `${currentStock} available`
            : "Out of stock"}
        </span>
      </p>

      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={decreaseQuantity}
            className="p-3 w-10 text-gray-600 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>
          <span className="p-3 w-10 text-center text-lg font-medium">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            className="p-3 w-10 text-gray-600 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            disabled={quantity >= currentStock}
          >
            <FaPlus />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3 px-6 font-semibold rounded-lg shadow-md transition cursor-pointer ${
            currentStock <= 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={currentStock <= 0}
        >
          {currentStock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {cartMessage && (
        <p className="text-green-600 text-sm mt-2">{cartMessage}</p>
      )}
    </div>
  );
}

export default AddToCartPanel;