import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

function CheckOutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const cart = JSON.parse(localStorage.getItem("pharmaCart")) || [];
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🧾 Order submitted:", {
      user: user?.email,
      items: cartItems,
      formData,
      total,
    });
    // Add confirmation logic or redirect here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Secure Checkout</h1>
      <p className="text-gray-600 mb-8">
        {user?.username
          ? `Welcome, ${user.username}. You're almost done!`
          : "Please log in to complete your purchase."}
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/*  Checkout Form */}
        <div className="flex flex-col gap-4">
          <label className="font-medium">Full Name</label>
          <input
            className="border rounded p-2"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label className="font-medium">Shipping Address</label>
          <input
            className="border rounded p-2"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label className="font-medium">Phone Number</label>
          <input
            className="border rounded p-2"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/*  Order Summary */}
        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between mb-2">
                  <span>{item.productTitle} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-700 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </form>

      {/*  Payment Options */}
      <div className="mt-10 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="flex flex-col gap-4">
          {["card", "paypal", "cod"].map((method) => (
            <label key={method}>
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={handleChange}
              />
              <span className="ml-2 capitalize">{method === "cod" ? "Cash on Delivery" : method}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default CheckOutPage;