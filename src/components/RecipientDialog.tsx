"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import type { Order, CartItem, OrderTotals } from "../types/types"; // adjust this import to your setup

interface ReceiptDialogProps {
  show: boolean;
  onClose: () => void;
  currentOrder: Order;
  cart: CartItem[];
  orderTotals: OrderTotals;
}

export const ReceiptDialog: React.FC<ReceiptDialogProps> = ({
  show,
  onClose,
  currentOrder,
  cart,
  orderTotals,
}) => {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Receipt - {currentOrder.id}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Summary of your order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <div className="border-b pb-2">
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Time: {currentOrder.timestamp}</p>
            <p>Customer: {currentOrder.customer}</p>
            <p>Waiter: {currentOrder.waiter}</p>
          </div>

          <div className="space-y-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${orderTotals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${orderTotals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>-${orderTotals.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${orderTotals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-blue-600 py-2 rounded-sm"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};
