import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Products({ addToCart }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const LIMIT = 20; // ✅ 20 products per load

  // ✅ Fetch products
  const loadProducts = async () => {
    if (loading) return;

    setLoading(true);

    try {
      let baseURL = category
        ? `https://dummyjson.com/products/category/${category.toLowerCase().trim()}`
        : "https://dummyjson.com/products";




      const url = `${baseURL}?limit=${LIMIT}&skip=${skip}`;
      console.log("🔗 Fetching:", url);

      const res = await fetch(url);
      const data = await res.json();

      if (data.products?.length > 0) {
        setProducts((prev) => [...prev, ...data.products]);
        setSkip((prev) => prev + LIMIT);
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }

    setLoading(false);
  };

  // ✅ Reset when category changes
  useEffect(() => {
    setProducts([]);
    setSkip(0);
    loadProducts();
  }, [category]);

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">
        {category ? `Category: ${category}` : "All Products"}
      </h2>

      {/* ✅ PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow hover:scale-105 transition"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
                className="w-full h-40 object-cover rounded"
              />
            </Link>

            <h3 className="font-semibold mt-2 truncate">{product.title}</h3>
            <p className="text-indigo-600 font-bold">₹{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="w-full mt-2 bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        ))}

        {/* ✅ Skeleton Loading */}
        {loading &&
          Array(8)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-600 p-4 rounded-lg animate-pulse"
              >
                <div className="w-full h-40 bg-gray-300 dark:bg-gray-500 rounded" />
                <div className="h-4 bg-gray-300 dark:bg-gray-500 mt-3 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-500 mt-2 rounded" />
              </div>
            ))}
      </div>

      {/* ✅ Load More Button */}
      <div className="text-center mt-8">
        {!loading && (
          <button
            onClick={loadProducts}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg"
          >
            Load More ↓
          </button>
        )}
      </div>

      {/* ✅ Loading Text */}
      {loading && (
        <p className="text-center mt-6 text-gray-500 dark:text-gray-300">
          Loading...
        </p>
      )}
    </section>
  );
}
