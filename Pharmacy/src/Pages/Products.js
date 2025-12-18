import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "../Components/SearchBar";
import SortController from "../Functions/SortController";
import ProductGrid from "../Components/ProductGrid";
import { useProducts } from "../Contexts/ProductContext";

function Products() {
  const { allProducts } = useProducts(); // ✅ match context
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Defensive: ensure allProducts is an array
    let filtered = Array.isArray(allProducts) ? [...allProducts] : [];

    if (selectedType !== "all") {
      filtered = filtered.filter((item) => item.type === selectedType);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedType, searchTerm, allProducts]);

  const handleSortedChange = useCallback((sorted) => {
    setSortedProducts(sorted);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative w-full h-[70vh] sm:h-[55vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/Pharm.jpeg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/20 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl font-serif text-blue-800 font-semibold tracking-wide mb-4">
            Your Trusted Pharmacy Collection
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto font-light mb-6">
            Discover carefully selected medicines, curated for your health,
            safety, and comfort — always backed by quality.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h2 className="text-3xl font-bold text-blue-700 md:text-left text-center">
            Explore All Products
          </h2>
        </header>

        {/* Controls Panel */}
        <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="w-full md:w-[440px]">
            <SearchBar onSearch={setSearchTerm} />
          </div>

          <div className="w-full md:w-[220px]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="all">All Products</option>
              <option value="medicines">Medicines</option>
              <option value="vitamins">Vitamins</option>
              <option value="medicalequipment">Medical Equipment</option>
              <option value="firstaid">First Aid</option>
              <option value="personalcare">Personal Care</option>
              <option value="babycare">Baby Care</option>
            </select>
          </div>

          <div className="w-full md:w-[220px]">
            <SortController
              data={filteredProducts}
              onChange={handleSortedChange}
            />
          </div>
        </section>

        {/* Product Grid */}
        <section>
          {sortedProducts.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">
              No products found.
            </p>
          ) : (
            <ProductGrid data={sortedProducts} />
          )}
        </section>
      </main>
    </div>
  );
}

export default Products;