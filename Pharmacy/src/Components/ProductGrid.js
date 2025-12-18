import React from 'react';
import Card from "./Card"; // adjust path if needed

function ProductGrid({ data }) {
  return (
    <div className="container mx-auto px-4  sm:px-2 lg:px-4 xl:px-0 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((item) => (
          <Card
            key={item.id}
            title={item.productTitle}
            description={item.description}
            priceUSD={item.priceInDollar}
            brand={item.brand}
            thumbnail={item.thumbnail}
            type={item.type}
            id={item.id}
            rating={item.rating}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;