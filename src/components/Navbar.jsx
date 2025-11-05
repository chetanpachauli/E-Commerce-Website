import React, { useState } from "react";
import { ShoppingCart, Sun, Moon, LogOut, Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ toggleTheme, cartCount }) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold border-b-2 border-yellow-300"
      : "hover:text-yellow-300 transition";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Search handler
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim() === "") return;

    navigate(`/products?search=${searchInput.trim()}`);
    setSearchInput("");
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white">

      <h1 className="text-2xl font-bold tracking-wide">Chetan Store 🛍️</h1>

      {/* ✅ Navigation Links */}
      <div className="flex gap-9 text-lg font-medium">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/products" className={linkClass}>Products</NavLink>
        <NavLink to="/cart" className={linkClass}>Cart</NavLink>
      </div>

      {/* ✅ Right Section */}
      <div className="flex items-center gap-5">

        {/* ✅ SEARCH BAR */}
        <form onSubmit={handleSearch} className="flex items-center bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent outline-none cursor-pointer text-white placeholder-white/70 w-32 md:w-48"
          />
          <button type="submit">
            <Search size={20} className="text-white cursor-pointer" />
          </button>
        </form>

        {/* 🌗 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
        >
          <Sun className="hidden dark:inline-block" size={20} />
          <Moon className="inline-block dark:hidden" size={20} />
        </button>

        {/* 🔓 Auth Buttons */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-sm px-3 py-1.5 rounded-lg transition font-semibold"
          >
            <LogOut size={18} /> Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg text-sm font-semibold transition"
          >
            Login
          </NavLink>
        )}

        {/* 🛒 Cart Icon */}
        <div className="relative">
          <ShoppingCart size={26} className="cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </div>

      </div>
    </nav>
  );
}
