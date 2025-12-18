import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/UserContext";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Load cart from backend whenever userId changes
  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      return;
    }
    fetch(`http://localhost:5000/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Error loading cart:", err));
  }, [userId]);

  // ✅ Refresh cart after any update
  const refreshCart = async () => {
    if (!userId) return;
    const res = await fetch(`http://localhost:5000/cart/${userId}`);
    const data = await res.json();
    setCartItems(data);
    window.dispatchEvent(new Event("cartUpdated")); // 👈 notify CartIcon
  };

  // ✅ Remove entire item
  const handleRemove = async (id) => {
    await fetch(`http://localhost:5000/cart/${id}`, { method: "DELETE" });
    refreshCart();
  };

  // ✅ Decrease quantity (not below 1)
  const handleDecreaseQuantity = async (id, quantity) => {
    if (quantity > 1) {
      await fetch(`http://localhost:5000/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: quantity - 1 }),
      });
      refreshCart();
    }
  };

  // ✅ Increase quantity (not beyond stock)
  const handleIncreaseQuantity = async (id, quantity, stock) => {
    if (quantity < stock) {
      await fetch(`http://localhost:5000/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: quantity + 1 }),
      });
      refreshCart();
    } else {
      alert("Sorry, not enough stock available!");
    }
  };

  // ✅ Totals
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-white cursor-pointer hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded-full transition-all duration-300"
      >
        <FaArrowLeft className="text-xs " />
        Go Back
      </button>

      <h1 className="text-3xl font-bold text-blue-700 mb-4 md:text-left text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.productTitle}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.productTitle}
                  </h2>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${Number(item.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">In Stock: {item.stock}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.quantity > 1 && (
                  <button
                    onClick={() =>
                      handleDecreaseQuantity(item.cart_id, item.quantity)
                    }
                    className="text-yellow-600 hover:text-yellow-800 transition text-sm font-medium border border-yellow-600 px-2 py-1 rounded"
                  >
                    −
                  </button>
                )}

                <button
                  onClick={() =>
                    handleIncreaseQuantity(item.cart_id, item.quantity, item.stock)
                  }
                  className={`${
                    item.quantity >= item.stock
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-600 hover:text-green-800"
                  } transition text-sm font-medium border border-green-600 px-2 py-1 rounded`}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>

                <button
                  onClick={() => handleRemove(item.cart_id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="flex justify-between items-center mt-8 border-t pt-4">
            <div className="text-lg font-medium text-gray-700">
              Total Items:{" "}
              <span className="text-blue-600 font-bold">{totalQuantity}</span>
            </div>
            <div className="text-lg font-medium text-gray-700">
              Total Price:{" "}
              <span className="text-blue-600 font-bold">${totalPrice}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;