"use client";

import type React from "react";
import { useMemo } from "react";
import { MenuGrid } from "./MenuGrid";
import { Search, Utensils, Filter, Star, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { menuItems } from "../data/menuData";
import { useStore } from "../store/useStore";

export const MenuSection: React.FC = () => {
  const activeCategory = useStore((state) => state.activeCategory);
  const setActiveCategory = useStore((state) => state.setActiveCategory);
  const searchDishes = useStore((state) => state.searchDishes);
  const setSearchDishes = useStore((state) => state.setSearchDishes);

  const menuCategories = [
    "Appetizers",
    "Main Course",
    "Desserts",
    "Drinks",
    "Sides",
  ];

  const filteredItems = useMemo(
    () =>
      menuItems.filter(
        (item) =>
          item.category === activeCategory &&
          item.name.toLowerCase().includes(searchDishes.toLowerCase())
      ),
    [activeCategory, searchDishes]
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchDishes(""); // Clear search when changing category
    toast.success(`Category changed to ${category}`);
  };

  const handleSearchChange = (search: string) => {
    setSearchDishes(search);
  };

  const handleMostPopular = () => {
    toast.success("Showing most popular items");
  };

  const handleSpecials = () => {
    toast.success("Showing today's specials");
  };

  const handleFilterByPrice = () => {
    toast.success("Filtering by price range");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {menuCategories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap font-medium ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryChange(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={handleFilterByPrice}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchDishes}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Menu Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-blue-600" />
            {activeCategory}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredItems.length} item(s) available
            {searchDishes && ` matching "${searchDishes}"`}
          </p>
        </div>

        <MenuGrid items={filteredItems} />

        {/* Bottom Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium bg-white shadow-sm"
            onClick={handleMostPopular}
            type="button"
          >
            <Star className="w-5 h-5 text-yellow-500" />
            Most Popular
          </button>
          <button
            className="flex items-center gap-2 px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium bg-white shadow-sm"
            onClick={handleSpecials}
            type="button"
          >
            <Zap className="w-5 h-5 text-orange-500" />
            Today's Specials
          </button>
        </div>

        {/* Menu Statistics */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Menu Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredItems.length}
              </div>
              <div className="text-sm text-gray-600">Items Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                $
                {filteredItems.length > 0
                  ? Math.min(
                      ...filteredItems.map((item) => item.price)
                    ).toFixed(2)
                  : "0.00"}
              </div>
              <div className="text-sm text-gray-600">Lowest Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                $
                {filteredItems.length > 0
                  ? Math.max(
                      ...filteredItems.map((item) => item.price)
                    ).toFixed(2)
                  : "0.00"}
              </div>
              <div className="text-sm text-gray-600">Highest Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                $
                {filteredItems.length > 0
                  ? (
                      filteredItems.reduce((sum, item) => sum + item.price, 0) /
                      filteredItems.length
                    ).toFixed(2)
                  : "0.00"}
              </div>
              <div className="text-sm text-gray-600">Average Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
