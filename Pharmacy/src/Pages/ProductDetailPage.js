import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import AddToCartPanel from "../Functions/AddToCartPanel";
import FavoriteButton from "../Components/FavouriteButton";
import { useProducts } from "../Contexts/ProductContext"; 

function ProductDetailPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { allProducts  } = useProducts();

  const product = allProducts.find(
    (item) =>
      String(item.id) === String(id) &&
      item.type?.toLowerCase() === type?.toLowerCase()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Product not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded-full transition-all duration-300"
      >
        <FaArrowLeft className="text-xs" />
        Go Back
      </button>

      {/* Product Layout */}
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="lg:w-1/2 relative flex justify-center items-center p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg">
          <FavoriteButton
            product={product}
            className="absolute top-2 left-2 z-10 w-10 h-10"
          />
          <img
            src={product.thumbnail}
            alt={product.productTitle}
            className="rounded-lg object-contain max-h-96 w-full"
          />
        </div>

        {/* Info Section */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-2">
              {product.productTitle}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{product.brand}</p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                ${product.priceInDollar}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 text-sm text-yellow-500 mb-4">
                <FaStar className="text-yellow-400" />
                <span>{product.rating} / 5</span>
                <span className="text-gray-500">
                  ({product.reviewsCount} reviews)
                </span>
              </div>
            )}

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
              {product.category && (
                <div>
                  <strong>Category:</strong> {product.category}
                </div>
              )}
              {product.form && (
                <div>
                  <strong>Form:</strong> {product.form}
                </div>
              )}
              {product.quantity && (
                <div>
                  <strong>Quantity:</strong> {product.quantity}
                </div>
              )}
              {product.tablets && (
                <div>
                  <strong>Tablets:</strong> {product.tablets}
                </div>
              )}
              {product.mg && (
                <div>
                  <strong>Strength:</strong> {product.mg}
                </div>
              )}
              {product.model && (
                <div>
                  <strong>Model:</strong> {product.model}
                </div>
              )}
              {product.dimensions && (
                <div>
                  <strong>Dimensions:</strong> {product.dimensions}
                </div>
              )}
              {product.weight && (
                <div>
                  <strong>Weight:</strong> {product.weight}
                </div>
              )}
              {product.stock && (
                <div>
                  <strong>Stock:</strong> {product.stock}
                </div>
              )}
              {product.skinType && (
                <div>
                  <strong>Skin Type:</strong> {product.skinType}
                </div>
              )}
              {product.scent && (
                <div>
                  <strong>Scent:</strong> {product.scent}
                </div>
              )}
              {product.warrantyPeriod && (
                <div>
                  <strong>Warranty:</strong> {product.warrantyPeriod}
                </div>
              )}
              {product.powerSource && (
                <div>
                  <strong>Power Source:</strong> {product.powerSource}
                </div>
              )}
              {(product.origin || product.countryOfOrigin) && (
                <div>
                  <strong>Origin:</strong>{" "}
                  {product.countryOfOrigin || product.origin}
                </div>
              )}
              {product.expirationDate && (
                <div>
                  <strong>Expires:</strong> {product.expirationDate}
                </div>
              )}
              {product.barcode && (
                <div>
                  <strong>Barcode:</strong> {product.barcode}
                </div>
              )}
            </div>

            {/* Ingredients */}
            {Array.isArray(product.ingredients) &&
              product.ingredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-gray-800 mb-1">
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {product.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Usage Instructions */}
            {product.usageInstructions && (
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-1">
                  Usage Instructions
                </h3>
                <p className="text-sm text-gray-700">
                  {product.usageInstructions}
                </p>
              </div>
            )}

            {/* Safety Warnings */}
            {product.safetyWarnings && (
              <div className="mb-6">
                <h3 className="text-md font-semibold text-red-600 mb-1">
                  Safety Warnings
                </h3>
                <p className="text-sm text-red-700">{product.safetyWarnings}</p>
              </div>
            )}

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-2 mb-6 text-xs">
              {product.isVegetarian && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  Vegetarian
                </span>
              )}
              {product.isGlutenFree && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                  Gluten-Free
                </span>
              )}
              {product.isDermatologistTested && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  Dermatologist Tested
                </span>
              )}
              {product.isHypoallergenic && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  Hypoallergenic
                </span>
              )}
              {product.isParabenFree && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                  Paraben-Free
                </span>
              )}
              {product.isCrueltyFree && (
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-medium">
                  Cruelty-Free
                </span>
              )}
              {product.isRechargeable && (
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
                  Rechargeable
                </span>
              )}
              {product.sterile && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                  Sterile
                </span>
              )}
            </div>
          </div>

          {/* Cart Panel */}
          <AddToCartPanel product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
