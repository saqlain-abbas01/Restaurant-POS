"use client";

import type React from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useStore } from "../store/useStore";
import type { MenuItem } from "../types/types";

interface MenuGridProps {
  items: MenuItem[];
}

export const MenuGrid: React.FC<MenuGridProps> = ({ items }) => {
  const { addToCart } = useStore();

  const getItemEmoji = (category: string): string => {
    const emojiMap: Record<string, string> = {
      Pizza: "🍕",
      Burger: "🍔",
      Appetizers: "🍗",
      "Main Course": "🍽️",
      Desserts: "🍰",
      Drinks: "🥤",
      Sides: "🍟",
    };
    return emojiMap[category] || "🍽️";
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast.success(`Added ${item.name} to cart`);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No items found</p>
        <p className="text-gray-400">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-6xl">{getItemEmoji(item.category)}</span>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2 text-gray-900">{item.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ${item.price.toFixed(2)}
              </span>
              <button
                className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
