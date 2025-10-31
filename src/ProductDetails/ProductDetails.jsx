
import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../components/data.js";

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-500 dark:text-gray-300">
        <h2 className="text-3xl font-bold mb-4">Product Not Found ❌</h2>
        <Link
          to="/products"
          className="text-indigo-600 hover:underline mt-2 text-lg"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 py-12 px-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
      {/* 🖼️ Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-80 h-80 object-cover rounded-2xl shadow-xl border border-gray-200 dark:border-gray-500"
        />
      </div>

      {/* 📄 Product Details */}
      <div className="w-full md:w-1/2 max-w-lg">
        <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {product.description || "A premium quality product by Chetan Store."}
        </p>
        <p className="text-2xl font-semibold mb-6 text-indigo-600">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition"
        >
          Add to Cart 🛒
        </button>

        <Link
          to="/products"
          className="block mt-6 text-indigo-500 hover:underline text-sm"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
