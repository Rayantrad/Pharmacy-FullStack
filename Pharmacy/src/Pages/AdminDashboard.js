import React, { useState } from "react";
import { useProducts } from "../Contexts/ProductContext";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { productsByCategory, addProduct, deleteProduct, updateProduct } =
    useProducts();
  const [selectedType, setSelectedType] = useState("medicines");
  const [formData, setFormData] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedSection, setSelectedSection] = useState("products"); // "products" or "orders"
const [orders, setOrders] = useState([]);

  //Fetch orders when Orders section is active
  useEffect(() => {
  if (selectedSection === "orders") {
    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }
}, [selectedSection]);

  //Add handlers for updating/cancelling orders
  const updateStatus = async (id, status) => {
  try {
    const res = await fetch(`http://localhost:5000/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (res.ok) {
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status: data.status } : order
        )
      );
    } else {
      alert(data.error || "Failed to update status");
    }
  } catch (err) {
    console.error("Error updating status:", err);
  }
};

const cancelOrder = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/orders/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      setOrders(prev => prev.filter(order => order.id !== id));
    } else {
      alert(data.error || "Unable to cancel order");
    }
  } catch (err) {
    console.error("Error cancelling order:", err);
  }
};

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddProduct = async () => {
  const newProduct = { ...formData, type: selectedType };

  try {
    await addProduct(newProduct);
    alert("✅ Product added successfully!");
    setFormData({});
  } catch (err) {
    console.error("Error adding product:", err);
    alert("❌ Failed to add product.");
  }
};

  const handleDelete = (type, id) => {
  const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this product?");
  if (confirmDelete) {
    deleteProduct(type, id);
    alert("🗑️ Product deleted successfully!");
  }
};

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product); // ✅ pre-fill form with product values
  };

  const handleUpdate = () => {
  try {
    updateProduct(editingProduct.id, formData);
    alert("✏️ Product updated successfully!");
    setEditingProduct(null);
    setFormData({});
  } catch (err) {
    console.error("Error updating product:", err);
    alert("❌ Failed to update product.");
  }
};

  const closeModal = () => {
    setEditingProduct(null);
    setFormData({});
  };

  const checkbox = (name, label) => (
    <label className="block">
      <input
        type="checkbox"
        name={name}
        checked={formData[name] || false}
        onChange={handleChange}
      />{" "}
      {label}
    </label>
  );

  const renderCommonFields = () => (
    <>
      <input
        name="productTitle"
        placeholder="Product Title"
        onChange={handleChange}
        value={formData.productTitle || ""}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={formData.description || ""}
      />
      <input
        name="priceInDollar"
        type="number"
        placeholder="Price ($)"
        onChange={handleChange}
        value={formData.priceInDollar || ""}
      />
      <input
        name="thumbnail"
        placeholder="Image URL"
        onChange={handleChange}
        value={formData.thumbnail || ""}
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        value={formData.category || ""}
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        onChange={handleChange}
        value={formData.stock || ""}
      />
      <input
        name="brand"
        placeholder="Brand"
        onChange={handleChange}
        value={formData.brand || ""}
      />
      <input
        name="rating"
        type="number"
        placeholder="Rating"
        onChange={handleChange}
        value={formData.rating || ""}
      />
      <input
        name="reviewsCount"
        type="number"
        placeholder="Reviews Count"
        onChange={handleChange}
        value={formData.reviewsCount || ""}
      />
    </>
  );

  const renderFields = () => {
    const common = renderCommonFields();

    const fields = {
      medicines: (
        <>
          {common}
          <input
            name="tablets"
            type="number"
            placeholder="Tablets"
            onChange={handleChange}
            value={formData.tablets || ""}
          />
          <input
            name="mg"
            placeholder="MG"
            onChange={handleChange}
            value={formData.mg || ""}
          />
          <input
            name="expirationDate"
            type="date"
            onChange={handleChange}
            value={formData.expirationDate || ""}
          />
          <input
            name="form"
            placeholder="Form"
            onChange={handleChange}
            value={formData.form || ""}
          />
          <input
            name="dosagePerDay"
            placeholder="Dosage Per Day"
            onChange={handleChange}
            value={formData.dosagePerDay || ""}
          />
          <input
            name="ingredients"
            placeholder="Ingredients"
            onChange={handleChange}
            value={formData.ingredients || ""}
          />
          {checkbox("isVegetarian", "Vegetarian")}
          {checkbox("isGlutenFree", "Gluten-Free")}
          <input
            name="countryOfOrigin"
            placeholder="Country of Origin"
            onChange={handleChange}
            value={formData.countryOfOrigin || ""}
          />
          <textarea
            name="safetyWarnings"
            placeholder="Safety Warnings"
            onChange={handleChange}
            value={formData.safetyWarnings || ""}
          />
          <input
            name="barcode"
            placeholder="Barcode"
            onChange={handleChange}
            value={formData.barcode || ""}
          />
        </>
      ),
      vitamins: null, // same as medicines
      medicalequipment: (
        <>
          {common}
          <input
            name="model"
            placeholder="Model"
            onChange={handleChange}
            value={formData.model || ""}
          />
          <input
            name="warrantyPeriod"
            placeholder="Warranty Period"
            onChange={handleChange}
            value={formData.warrantyPeriod || ""}
          />
          <input
            name="powerSource"
            placeholder="Power Source"
            onChange={handleChange}
            value={formData.powerSource || ""}
          />
          <input
            name="dimensions"
            placeholder="Dimensions"
            onChange={handleChange}
            value={formData.dimensions || ""}
          />
          <input
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
            value={formData.weight || ""}
          />
          <textarea
            name="usageInstructions"
            placeholder="Usage Instructions"
            onChange={handleChange}
            value={formData.usageInstructions || ""}
          />
          <input
            name="countryOfOrigin"
            placeholder="Country of Origin"
            onChange={handleChange}
            value={formData.countryOfOrigin || ""}
          />
          {checkbox("isRechargeable", "Rechargeable")}
          <input
            name="barcode"
            placeholder="Barcode"
            onChange={handleChange}
            value={formData.barcode || ""}
          />
        </>
      ),
      firstaid: (
        <>
          {common}
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            onChange={handleChange}
            value={formData.quantity || ""}
          />
          {checkbox("sterile", "Sterile")}
          <input
            name="dimensions"
            placeholder="Dimensions"
            onChange={handleChange}
            value={formData.dimensions || ""}
          />
          <textarea
            name="usageInstructions"
            placeholder="Usage Instructions"
            onChange={handleChange}
            value={formData.usageInstructions || ""}
          />
          <input
            name="countryOfOrigin"
            placeholder="Country of Origin"
            onChange={handleChange}
            value={formData.countryOfOrigin || ""}
          />
          <input
            name="expirationDate"
            type="date"
            onChange={handleChange}
            value={formData.expirationDate || ""}
          />
          <input
            name="barcode"
            placeholder="Barcode"
            onChange={handleChange}
            value={formData.barcode || ""}
          />
        </>
      ),
      personalcare: (
        <>
          {common}
          <input
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            value={formData.quantity || ""}
          />
          <input
            name="form"
            placeholder="Form"
            onChange={handleChange}
            value={formData.form || ""}
          />
          <input
            name="scent"
            placeholder="Scent"
            onChange={handleChange}
            value={formData.scent || ""}
          />
          <input
            name="skinType"
            placeholder="Skin Type"
            onChange={handleChange}
            value={formData.skinType || ""}
          />
          <textarea
            name="usageInstructions"
            placeholder="Usage Instructions"
            onChange={handleChange}
            value={formData.usageInstructions || ""}
          />
          <input
            name="expirationDate"
            type="date"
            onChange={handleChange}
            value={formData.expirationDate || ""}
          />
          {checkbox("isDermatologistTested", "Dermatologist Tested")}
          {checkbox("isCrueltyFree", "Cruelty-Free")}
          {checkbox("isParabenFree", "Paraben-Free")}
          <input
            name="countryOfOrigin"
            placeholder="Country of Origin"
            onChange={handleChange}
            value={formData.countryOfOrigin || ""}
          />
          <input
            name="barcode"
            placeholder="Barcode"
            onChange={handleChange}
            value={formData.barcode || ""}
          />
        </>
      ),
      babycare: (
        <>
          {common}
          <input
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            value={formData.quantity || ""}
          />
          <input
            name="form"
            placeholder="Form"
            onChange={handleChange}
            value={formData.form || ""}
          />
          <input
            name="scent"
            placeholder="Scent"
            onChange={handleChange}
            value={formData.scent || ""}
          />
          <textarea
            name="usageInstructions"
            placeholder="Usage Instructions"
            onChange={handleChange}
            value={formData.usageInstructions || ""}
          />
          {checkbox("isDermatologistTested", "Dermatologist Tested")}
          {checkbox("isHypoallergenic", "Hypoallergenic")}
          {checkbox("isParabenFree", "Paraben-Free")}
          <input
            name="expirationDate"
            type="date"
            onChange={handleChange}
            value={formData.expirationDate || ""}
          />
          <input
            name="countryOfOrigin"
            placeholder="Country of Origin"
            onChange={handleChange}
            value={formData.countryOfOrigin || ""}
          />
          <input
            name="barcode"
            placeholder="Barcode"
            onChange={handleChange}
            value={formData.barcode || ""}
          />
        </>
      ),
    };

    return fields[selectedType] || fields["medicines"];
  };

  const renderTable = (type) => {
    const products = productsByCategory[type] || [];
    if (products.length === 0) return <p>No products added yet.</p>;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-blue-100 text-blue-800 text-sm uppercase sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Title</th>
              <th className="px-6 py-3 text-left font-semibold">Type</th>
              <th className="px-6 py-3 text-left font-semibold">Price</th>
              <th className="px-6 py-3 text-left font-semibold">Stock</th>
              <th className="px-6 py-3 text-left font-semibold">Brand</th>
              <th className="px-6 py-3 text-left font-semibold">Rating</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {products.map((prod) => (
              <tr key={prod.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{prod.productTitle}</td>
                <td className="px-6 py-4">{prod.type}</td>
                <td className="px-6 py-4">
                  ${Number(prod.priceInDollar).toFixed(2)}
                </td>
                <td className="px-6 py-4">{prod.stock}</td>
                <td className="px-6 py-4">{prod.brand}</td>
                <td className="px-6 py-4">{prod.rating}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleDelete(prod.type, prod.id)}
                    className="text-red-600 hover:text-red-800 font-medium px-3 py-1 border border-red-600 rounded transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(prod)}
                    className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 border border-blue-600 rounded transition"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
  <div className="p-8 font-sans bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
      Admin Dashboard
    </h1>

    {/* Section Switcher */}
    <div className="mb-6 flex gap-4 justify-center">
      <button
        onClick={() => setSelectedSection("products")}
        className={`px-4 py-2 rounded-md font-medium ${
          selectedSection === "products"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Products
      </button>
      <button
        onClick={() => setSelectedSection("orders")}
        className={`px-4 py-2 rounded-md font-medium ${
          selectedSection === "orders"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Orders
      </button>
    </div>

    {selectedSection === "products" ? (
      <>
        {/* ✅ Product Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Product Type:
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="medicines">Medicines</option>
            <option value="vitamins">Vitamins</option>
            <option value="medicalequipment">Medical Equipment</option>
            <option value="firstaid">First Aid</option>
            <option value="personalcare">Personal Care</option>
            <option value="babycare">Baby Care</option>
          </select>
        </div>

        {/* Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderFields()}
          </div>
          <button
            onClick={handleAddProduct}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>

        {/* Table */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
          {selectedType} Table
        </h2>
        <div className="overflow-x-auto">{renderTable(selectedType)}</div>

        {/* ✅ Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFields()}
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    ) : (
     <>
  {/* ✅ Orders Section */}
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders Table</h2>
  {orders.length === 0 ? (
    <p className="text-gray-600">No orders found.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-blue-100 text-blue-800 text-sm uppercase sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left">Order #</th>
            <th className="px-6 py-3 text-left">User</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-left">Items</th> {/* ✅ new column */}
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {orders.map(order => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">{order.user_order_number}</td>
              <td className="px-6 py-4">
                {order.fullName} <br />
                <span className="text-xs text-gray-500">{order.email}</span>
              </td>
              <td className="px-6 py-4">
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4">${Number(order.total).toFixed(2)}</td>
              <td className="px-6 py-4">
                <ul className="space-y-1">
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.productTitle} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 flex flex-col md:flex-row gap-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border px-2 py-1 rounded w-full md:w-auto"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</>
    )}
  </div>
);
};

export default AdminDashboard;
