import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useProducts } from "../Contexts/ProductContext";

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { refreshProducts  } = useProducts();

  const [orderedItems, setOrderedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [userOrderNumber, setUserOrderNumber] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCart = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/${user.id}`);
      const data = await res.json();
      setCartItems(data);
    };
    fetchCart();
  }, [user.id]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate form fields
  if (!formData.fullName || !formData.address || !formData.phone) {
    alert("Please fill in all required fields.");
    return;
  }


  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const orderData = {
    user_id: user.id,
    ...formData,
    items: cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    })),
    subtotal,
    shipping,
    total
  };

  console.log("Submitting order:", orderData);

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();
    console.log("Order response:", data);

    if (res.ok) {
      
      setOrderId(data.orderId);
      setOrderedItems(cartItems);
      setUserOrderNumber(data.user_order_number); // store per-user number
      setOrderConfirmed(true);

      setCartItems([]);
      window.dispatchEvent(new Event("cartUpdated"));

  // Refresh products globally
  await refreshProducts();



    } else {
      alert(data.error || "Error placing order");
    }
  } catch (err) {
    console.error("Error placing order:", err);
    alert("Error placing order");
  }
};
 if (orderConfirmed) {
  const confirmedSubtotal = orderedItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
const confirmedShipping = confirmedSubtotal > 50 ? 0 : 5.99;
const confirmedTotal = confirmedSubtotal + confirmedShipping;
  return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      {/* Success icon */}
      <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-green-600 text-5xl">✔</span>
      </div>

      <h1 className="text-3xl font-bold mt-4">Order Confirmed!</h1>
      <p className="text-gray-600 mt-2">
        Thank you, {formData.fullName || user.username}. Your order #{userOrderNumber} has been placed.
      </p>

      {/* Order Summary */}
      <div className="bg-white shadow rounded p-6 mt-6 text-left">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {/* Customer info */}
        <div className="space-y-1 text-gray-700 mb-4">
          <p><strong>Name:</strong> {formData.fullName || user.username}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
          <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
        </div>

        <hr className="my-4" />

        {/* Items Ordered */}
        <h3 className="text-lg font-bold mb-2 text-blue-700">Items Ordered</h3>
        <ul className="divide-y divide-gray-200">
          {orderedItems.map((item, idx) => (
            <li key={idx} className="flex justify-between py-2">
              <span>{item.productTitle} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <hr className="my-4" />

        {/* Totals */}
<div className="flex justify-between text-gray-700">
  <span>Subtotal (Items Only)</span>
  <span>${confirmedSubtotal.toFixed(2)}</span>
</div>
<div className="flex justify-between text-gray-700">
  <span>Shipping</span>
  <span>${confirmedShipping.toFixed(2)}</span>
</div>
<div className="flex justify-between font-bold text-blue-700 mt-2">
  <span>Total (Items + Shipping)</span>
  <span>${confirmedTotal.toFixed(2)}</span>
</div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center mt-8">
        <button
          onClick={() => navigate("/orders")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View My Orders
        </button>
        <button
          onClick={() => navigate("/products")}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded-full transition-all"
      >
        <FaArrowLeft className="text-xs" /> Go Back
      </button>

      <h1 className="text-3xl font-bold text-blue-900 mb-6">Secure Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <input className="border rounded p-2" type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input className="border rounded p-2" type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />
          <input className="border rounded p-2" type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
        </div>
      </form>

      <div className="mt-10 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        {["card", "paypal", "cod"].map((method) => (
          <label key={method} className="block mb-2">
            <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleChange} />
            <span className="ml-2 capitalize">{method === "cod" ? "Cash on Delivery" : method}</span>
          </label>
        ))}
        <button type="submit" onClick={handleSubmit} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;