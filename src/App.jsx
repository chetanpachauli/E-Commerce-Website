import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Login from "./login/Login";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProtectedRoute from "./protect/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState("light");

  // ✅ Save cart in localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // ✅ Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // ✅ Cart functions
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <AuthProvider>
      <div
        className={`min-h-screen flex flex-col ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar toggleTheme={toggleTheme} cartCount={cart.length} />

        <Routes>
          {/* 🔹 Login */}
          <Route path="/login" element={<Login />} />

          {/* 🔹 Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />



               <section className="px-6 py-16 bg-gray-100 dark:bg-gray-700 text-center">
  <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
    🔥 Trending Categories
  </h2>

  <p className="text-gray-600 dark:text-gray-300 mb-8">
    Explore the most loved product types this season!
  </p>

  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

    {[
      {
        name: "Smartphones",
        category: "smartphones",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
      },
      {
        name: "Laptops",
        category: "laptops",
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
      },
      {
        name: "Fragrances",
        category: "fragrances",
        img: "https://images.pexels.com/photos/965981/pexels-photo-965981.jpeg"
      },
      {
        name: "Skincare",
        category: "skincare",
        img: "https://images.pexels.com/photos/3735654/pexels-photo-3735654.jpeg"
      },
      {
        name: "Groceries",
        category: "groceries",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
      },

      {
        name: "Beauty",
        category: "beauty",
        img: "https://images.unsplash.com/photo-1500839941678-aae14dbfae9a?w=800"
      },
      {
        name: "Home Decoration",
        category: "home-decoration",
        img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
      },
      {
        name: "Furniture",
        category: "furniture",
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
      },

      {
        name: "Mens Shirts",
        category: "mens-shirts",
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
      },
      {
        name: "Mens Shoes",
        category: "mens-shoes",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
      },

      {
        name: "Womens Dresses",
        category: "womens-dresses",
        img: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=800"
      },
      {
        name: "Sunglasses",
        category: "sunglasses",
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800"
      },

      {
        name: "Motorcycle",
        category: "motorcycle",
        img: "https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800"
      },

    ].map((item, index) => (
      <Link
        key={index}
        to={`/products?category=${item.category}`}
        className="bg-white dark:bg-gray-500 p-4 rounded-2xl shadow hover:scale-105 transition block"
      >
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="w-full h-32 object-cover rounded-xl"
        />
        <p className="mt-2 font-semibold">{item.name}</p>
      </Link>
    ))}

  </div>
</section>





              </>
            }
          />

          {/* 🔹 Products Page */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products addToCart={addToCart} />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Product Details */}
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails addToCart={addToCart} />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Cart Page */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cart={cart} removeFromCart={removeFromCart} />
              </ProtectedRoute>
            }
          />

          {/* 🔹 404 Page */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-2xl text-red-500 font-bold">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
}
