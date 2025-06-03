"use client";

import type React from "react";
import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useStore } from "../store/useStore";
import type { OrderType, TabType } from "../types/types";

interface TopNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [orderType, setOrderType] = useState<OrderType>("Dine In");

  const searchDishes = useStore((state) => state.searchDishes);
  const setSearchDishes = useStore((state) => state.setSearchDishes);
  const searchOrders = useStore((state) => state.searchOrders);
  const setSearchOrders = useStore((state) => state.setSearchOrders);
  const cart = useStore((state) => state.cart);

  console.log("cart", cart);

  const { createNewOrder, updateCurrentOrderType } = useStore();

  const orderTypes: OrderType[] = ["Dine In", "Take Away", "Delivery"];
  const tabs: TabType[] = ["Menu", "Orders"];

  const handleNewOrderClick = () => {
    if (cart.length <= 0) {
      toast.error("your cart is empty");
    }
    const newOrder = createNewOrder();
    toast.success(`New order created: ${newOrder.id}`);
    onTabChange("Menu"); // Switch to menu after creating order
  };

  const handleOrderTypeClick = (type: OrderType) => {
    setOrderType(type);
    updateCurrentOrderType(type);
    toast.success(`Order type changed to ${type}`);
  };

  const handleSearch = (value: string) => {
    if (activeTab === "Menu") {
      setSearchDishes(value);
    }
    if (activeTab === "Orders") {
      setSearchOrders(value);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center whitespace-nowrap gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
            onClick={handleNewOrderClick}
            type="button"
          >
            <Plus className="w-4 h-4" />
            New Order
          </button>

          {/* Order Type Buttons */}
          <div className="flex items-center space-x-2">
            {orderTypes.map((type) => (
              <button
                key={type}
                className={`px-3 py-2 text-[16px] rounded-md transition-colors whitespace-nowrap ${
                  orderType === type
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-300 text-gray-700  hover:bg-gray-50"
                }`}
                onClick={() => handleOrderTypeClick(type)}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm px-2 text-gray-600">1/1</span>
            <button
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Menu/Orders Tab Buttons */}
          <div className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => onTabChange(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={
                activeTab === "Menu" ? "Search dishes..." : "Search order #"
              }
              value={activeTab === "Menu" ? searchDishes : searchOrders}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-48 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
