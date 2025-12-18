import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();

        const byCategory = Array.isArray(data)
          ? data.reduce((acc, product) => {
              const type = product.type;
              if (!acc[type]) acc[type] = [];
              acc[type].push(product);
              return acc;
            }, {})
          : {};

        setProductsByCategory(byCategory);
        setAllProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Get one product
  const getProductDetails = async (id) => {
    const res = await fetch(`http://localhost:5000/products/${id}`);
    return await res.json();
  };

  // Add product
  const addProduct = async (product) => {
    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const newProduct = await res.json();

      setAllProducts((prev) => [...prev, newProduct]);
      setProductsByCategory((prev) => ({
        ...prev,
        [newProduct.type]: [...(prev[newProduct.type] || []), newProduct],
      }));
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Update product
  const updateProduct = async (id, product) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const updated = await res.json();

      setAllProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
      setProductsByCategory((prev) => ({
        ...prev,
        [updated.type]: prev[updated.type].map((p) =>
          p.id === id ? updated : p
        ),
      }));
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Delete product
  const deleteProduct = async (type, id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });

      setAllProducts((prev) => prev.filter((p) => p.id !== id));
      setProductsByCategory((prev) => ({
        ...prev,
        [type]: prev[type].filter((p) => p.id !== id),
      }));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        productsByCategory,
        allProducts,
        getProductDetails,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);