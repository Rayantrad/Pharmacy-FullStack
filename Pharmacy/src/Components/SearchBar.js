import React from 'react';
import { FiSearch } from 'react-icons/fi'; // Feather icon

function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
<div className="flex justify-center ">
  <div className="relative w-full max-w-xl">
    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl" />
    <input
      type="text"
      onChange={handleChange}
      placeholder="Search products..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>
  );
}

export default SearchBar;