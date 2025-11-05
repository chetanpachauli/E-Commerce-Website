import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Products({ addToCart }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const category = params.get("category");
  const searchTerm = params.get("search")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);  // ✅ NEW (no more items)

  const LIMIT = 20;

  const getUrl = () => {
    if (category) {
      return `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`;
    }
    return `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;
  };

  const loadProducts = async () => {
    if (loading || noMore) return;

    setLoading(true);

    try {
      const res = await fetch(getUrl());
      const data = await res.json();

      if (!data.products || data.products.length === 0) {
        setNoMore(true); // ✅ NEW
      } else {
        setProducts((prev) => [...prev, ...data.products]);
        setSkip((prev) => prev + LIMIT);
      }

    } catch (error) {
      console.log("❌ Fetch Error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setNoMore(false); // ✅ NEW
    loadProducts();
  }, [category, searchTerm]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="px-6 py-12">

      <h2 className="text-3xl font-bold mb-6">
        {category
          ? `Category: ${category}`
          : searchTerm
          ? `Search: ${searchTerm}`
          : "All Products"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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
      </div>

      {/* ✅ Load More Button */}
      <div className="text-center mt-8">
        {!loading && !noMore && (
          <button
            onClick={loadProducts}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg"
          >
            Load More ↓
          </button>
        )}
      </div>

      {/* ✅ Loading text */}
      {loading && (
        <p className="text-center mt-6 text-gray-500 dark:text-gray-300">
          Loading...
        </p>
      )}

      {/* ✅ NO MORE ITEMS MESSAGE */}
      {noMore && (
        <p className="text-center mt-6 text-red-500 font-semibold text-lg">
           No more items available!
        </p>
      )}

    </section>
  );
}
