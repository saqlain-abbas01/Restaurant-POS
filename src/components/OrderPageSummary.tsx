import React from "react";

import type { Order } from "../types/types";

interface OrdersSummaryProps {
  orders: Order[];
}

export const OrdersSummary: React.FC<OrdersSummaryProps> = ({ orders }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Orders Summary
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {orders.length}
          </div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">
            {orders.filter((o) => o.status === "DRAFT").length}
          </div>
          <div className="text-sm text-gray-600">Draft</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === "PREPARING").length}
          </div>
          <div className="text-sm text-gray-600">Preparing</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === "COMPLETED").length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            $
            {orders
              .reduce((sum, order) => sum + (order.total || 0), 0)
              .toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>
    </div>
  );
};
