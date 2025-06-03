"use client";

import type React from "react";
import { useMemo, useState } from "react";
import {
  Clock,
  User,
  DollarSign,
  ShoppingBag,
  Edit,
  Trash2,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";
import { useStore } from "../store/useStore";
import type { Order } from "../types/types";
import OrderEditModal from "./EditOrderModal";
import { OrdersSummary } from "./OrderPageSummary";
import { QuickActions } from "./QuickActions";

interface OrdersViewProps {
  onSelectOrder: (order: Order) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ onSelectOrder }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const searchOrders = useStore((state) => state.searchOrders);
  const setSearchOrders = useStore((state) => state.setSearchOrders);
  const updateOrder = useStore((state) => state.updateOrder);
  const { orders } = useStore();

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    if (!searchOrders) return orders;
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchOrders.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchOrders.toLowerCase()) ||
        order.waiter.toLowerCase().includes(searchOrders.toLowerCase())
    );
  }, [orders, searchOrders]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "PREPARING":
        return "bg-yellow-100 text-yellow-800";
      case "READY":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleOrderClick = (order: Order) => {
    onSelectOrder(order);
  };

  const handleEditOrder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();

    if (order.status === "DRAFT" || order.status === "CONFIRMED") {
      setSelectedOrder(order);
      setIsEditModalOpen(true);
    } else {
      toast.error(`Cannot edit order ${order.id} - Status: ${order.status}`);
    }
  };

  const handleDeleteOrder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    if (order.status === "DRAFT") {
      toast.success(`Order ${order.id} deleted`);
    } else {
      toast.error(`Cannot delete order ${order.id} - Status: ${order.status}`);
    }
  };

  const handleSerach = (value: string) => {
    console.log("value", value);
    setSearchOrders(value);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    updateOrder(updatedOrder);
    setIsEditModalOpen(false);
  };
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
        <p className="text-gray-600 mt-1">
          View and manage all restaurant orders
        </p>

        {/* Search Bar */}
        <div className="mt-4 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders by ID, customer, or waiter..."
            value={searchOrders}
            onChange={(e) => handleSerach(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            {searchOrders
              ? "No orders found matching your search"
              : "No orders found"}
          </p>
          <p className="text-gray-400 mt-1">
            {searchOrders
              ? "Try a different search term"
              : "Orders will appear here once created"}
          </p>
          {!searchOrders && (
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">To create your first order:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Click the "New Order" button</li>
                <li>Switch to the "Menu" tab</li>
                <li>Add items to your cart</li>
                <li>Process payment to complete the order</li>
              </ol>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Search Results Info */}
          {searchOrders && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                Found {filteredOrders.length} order(s) matching "{searchOrders}"
              </p>
            </div>
          )}

          {/* Orders List */}
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-xl text-gray-900">
                    {order.id}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => handleEditOrder(order, e)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title="Edit Order"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteOrder(order, e)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">Time:</span>
                    <span className="ml-1">{order.timestamp}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium">Customer:</span>
                    <span className="ml-1">{order.customer}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="font-medium">Total:</span>
                    <span className="ml-1 font-semibold">
                      {order.total
                        ? `$${order.total.toFixed(2)}`
                        : "Calculating..."}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium bg-gray-100 px-2 py-1 rounded">
                      {order.type}
                    </span>
                    <span className="ml-2">Waiter: {order.waiter}</span>
                  </div>

                  {order.items && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">
                        {order.items.length} item(s)
                      </span>
                      <div className="text-xs mt-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <span key={item.id}>
                            {item.name}
                            {index < Math.min(order.items!.length, 2) - 1 &&
                              ", "}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span>... +{order.items.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Orders Summary */}
          <OrdersSummary orders={orders} />
          {/* Quick Actions */}
          <QuickActions orders={orders} />
        </div>
      )}
      <OrderEditModal
        open={isEditModalOpen}
        order={selectedOrder}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateOrder}
      />
    </div>
  );
};
