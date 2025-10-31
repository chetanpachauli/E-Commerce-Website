import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="p-8 bg-gray-100 dark:bg-gray-800 rounded-t-3xl min-h-[80vh]">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No items in your cart yet 😔
          </p>
          <Link
            to="/products"
            className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white dark:bg-gray-700 p-4 rounded-xl shadow hover:scale-[1.01] transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="font-semibold">{item.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* ✅ Total & Checkout */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t border-gray-300 dark:border-gray-600 pt-4">
            <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Total: ₹{total}
            </div>

            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                to="/products"
                className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                ← Continue Shopping
              </Link>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
