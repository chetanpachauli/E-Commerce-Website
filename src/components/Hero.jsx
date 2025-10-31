import React from "react";

export default function Hero() {
  return (
    <section className="text-center py-16 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white">
      <h2 className="text-4xl font-bold mb-4">Welcome to Chetan Store!</h2>
      <p className="text-lg mb-6">Find the latest trends at the best prices 💸</p>
      <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
        Shop Now
      </button>
    </section>
  );
}
