import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { FaTrash } from "react-icons/fa";
import { FaClock, FaCheckCircle, FaCog, FaTruck, FaBoxOpen, FaTimesCircle } from "react-icons/fa";


function MyOrdersPage() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  //Load orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/orders");
        const data = await res.json();
        // Filter only this user's orders
        setOrders(data.filter(order => order.user_id === user.id));
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [user.id]);

  // Cancel order (only if pending or confirmed)
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== orderId));
        alert("Order cancelled successfully");
      } else {
        alert(data.error || "Unable to cancel order");
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Something went wrong while cancelling the order");
    }
  };

  //Status timeline component
const StatusTimeline = ({ status }) => {
  const steps = [
    { key: "pending", label: "Pending", icon: <FaClock /> },
    { key: "confirmed", label: "Confirmed", icon: <FaCheckCircle /> },
    { key: "processing", label: "Processing", icon: <FaCog /> },
    { key: "shipped", label: "Shipped", icon: <FaTruck /> },
    { key: "delivered", label: "Delivered", icon: <FaBoxOpen /> },
  ];

  return (
    <div className="flex items-center gap-4 mt-4">
      {steps.map((step, idx) => {
        const isActive = steps.findIndex(s => s.key === status) >= idx;
        return (
          <React.Fragment key={step.key}>
            <div
              className={`flex items-center gap-2 text-xs font-medium ${
                isActive ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {step.icon}
              <span>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <span className="flex-1 h-0.5 bg-gray-300"></span>
            )}
          </React.Fragment>
        );
      })}
      {status === "cancelled" && (
        <div className="flex items-center gap-2 text-xs font-medium text-red-600">
          <FaTimesCircle />
          <span>Cancelled</span>
        </div>
      )}
    </div>
  );
};

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no confirmed orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white shadow rounded p-6 relative">
              {/*Trash icon top-right (only for cancelled orders) */}
              {order.status === "cancelled" && (
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(`http://localhost:5000/orders/${order.id}`, {
                        method: "DELETE",
                      });
                      const data = await res.json();
                      if (res.ok) {
                        setOrders(prev => prev.filter(o => o.id !== order.id));
                        alert("Order removed from history");
                      } else {
                        alert(data.error || "Unable to remove order");
                      }
                    } catch (err) {
                      console.error("Error removing order:", err);
                      alert("Something went wrong while removing the order");
                    }
                  }}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                  title="Remove Order"
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              )}

              <h2 className="text-xl font-semibold mb-2">
                Order #{order.user_order_number}
              </h2>

              <p className="text-gray-600 mb-2">
                <strong>Date:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Status:</strong>{" "}
                <span className="capitalize text-blue-700">{order.status}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Total:</strong> ${Number(order.total).toFixed(2)}
              </p>

              {/* Items */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="space-y-1">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.productTitle} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status Timeline */}
              <StatusTimeline status={order.status} />

              {/*Cancel button (only for pending/confirmed orders) */}
              {["pending"].includes(order.status) && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;