import type { Order } from "../types/types";
import toast from "react-hot-toast";
interface QuickActionsProps {
  orders: Order[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ orders }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => toast("Showing pending orders")}
          className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          <div className="text-lg font-semibold text-yellow-600">
            {orders.filter((o) => o.status === "PREPARING").length}
          </div>
          <div className="text-sm text-gray-600">View Pending</div>
        </button>
        <button
          onClick={() => toast("Showing ready orders")}
          className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          <div className="text-lg font-semibold text-green-600">
            {orders.filter((o) => o.status === "READY").length}
          </div>
          <div className="text-sm text-gray-600">View Ready</div>
        </button>
        <button
          onClick={() => toast.success("Exporting orders to CSV")}
          className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          <div className="text-sm font-medium text-blue-600">Export CSV</div>
          <div className="text-xs text-gray-600">Download Data</div>
        </button>
        <button
          onClick={() => toast.success("Printing daily report")}
          className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          <div className="text-sm font-medium text-purple-600">
            Daily Report
          </div>
          <div className="text-xs text-gray-600">Print Summary</div>
        </button>
      </div>
    </div>
  );
};
