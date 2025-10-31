
import React from "react";
import { ShoppingCart, Sun, Moon, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ toggleTheme, cartCount }) {
  // ✅ Correct variable names from AuthContext
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Active link styling
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold border-b-2 border-yellow-300"
      : "hover:text-yellow-300 transition";

  // ✅ Logout handler
  const handleLogout = () => {
    logout(); // clear localStorage + context
    navigate("/login"); // redirect
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      {/* 🔹 Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        Chetan Store 🛍️
      </h1>

      {/* 🔹 Navigation Links */}
      <div className="flex gap-9 text-lg font-medium">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/cart" className={linkClass}>
          Cart
        </NavLink>
      </div>

      {/* 🔹 Right Section */}
      <div className="flex items-center gap-5">
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
            <LogOut size={18} />
            Logout
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
