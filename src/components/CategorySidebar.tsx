"use client";

import type React from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { categories } from "../data/menuData";
import { useStore } from "../store/useStore";

export const CategorySidebar: React.FC = () => {
  const activeCategory = useStore((state) => state.activeCategory);
  const setActiveCategory = useStore((state) => state.setActiveCategory);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    toast.success(`Category changed to ${category}`);
  };

  return (
    <div className="w-20 bg-white border-l border-gray-200 flex flex-col items-center py-4 space-y-4">
      <button
        className="flex items-center justify-center w-12 h-12 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        onClick={() => {
          setSidebarOpen(false);
        }}
      >
        <X className="w-5 h-5" />
      </button>

      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <button
            key={category.name}
            className={`flex flex-col items-center justify-center w-12 h-12 p-1 rounded-lg transition-colors ${
              activeCategory === category.name
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <IconComponent className="w-5 h-5 mb-1" />
            <span className="text-xs leading-none">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};
