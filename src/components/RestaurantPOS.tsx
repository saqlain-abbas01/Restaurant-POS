"use client";

import type React from "react";
import { useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { TopNavigation } from "./TopNavigation";
import { MenuSection } from "./MenuSection";
import { CategorySidebar } from "./CategorySidebar";
import { OrdersView } from "./OrdersView";
import toast from "react-hot-toast";
import type { TabType } from "../types/types";
import { useStore } from "../store/useStore";
import { Menu } from "lucide-react";

const RestaurantPOS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Menu");
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    console.log("tab", tab);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <OrderSummary />

      <div className="flex-1 flex flex-col">
        <TopNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === "Menu" ? (
          <MenuSection />
        ) : (
          <OrdersView
            onSelectOrder={(order) => {
              toast(`Viewing details for order ${order.id}`);
            }}
          />
        )}
      </div>

      {isSidebarOpen ? (
        <aside className="your-sidebar-class">
          <CategorySidebar />
        </aside>
      ) : (
        <div className="p-3  shadow-lg bg-white hover:bg-gray-100 transition">
          <button
            onClick={() => {
              setSidebarOpen(true);
              toast.success("Sidebar opened");
            }}
            className="p-3 "
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantPOS;
