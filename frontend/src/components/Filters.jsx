import React from "react";

const Filters = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
      <ul className="space-y-1 text-gray-600 text-sm">
        <li
          className={`cursor-pointer ${selectedCategory === "" ? "font-medium text-black" : ""}`}
          onClick={() => setSelectedCategory("")}
        >
          All
        </li>
        {categories.map((cat) => (
          <li
            key={cat}
            className={`cursor-pointer ${
              selectedCategory === cat ? "font-medium text-black" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;