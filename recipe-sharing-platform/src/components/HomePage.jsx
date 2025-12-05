function HomePage({ recipes, onDelete }) {
  import { useState, useEffect } from "react";
  import initialData from "./data.json";
  import Link from "react-router-dom";
  return (
    <div className="px-4 py-10">
      <h1 className="text-4xl font-bold text-white text-center md-10 drop-shadow-lg justify-normal">
        Recipe Collection
      </h1>
      <div className="flex justify-center">
        <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-10 justify-items-center">
          {recipes.map((item) => (
            <div
              key={item.id}
              className="bg-white/95 backdrop-blur rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors flex-1">
                    {item.title}
                  </h2>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-700 text-xl leading-none ml-2 transition-colors"
                    title="Delete recipe"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                  {item.summary}
                </p>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-32 object-cover rounded-full mx-auto border-4 border-emerald-200 group-hover:border-emerald-400 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
