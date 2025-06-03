"use client";

import type React from "react";
import { useState } from "react";
import { Calculator } from "./Calculator";
import toast from "react-hot-toast";
import { useStore } from "../store/useStore";
import {
  Clock,
  User,
  Utensils,
  CalculatorIcon as CalcIcon,
  Receipt,
  CreditCard,
  Percent,
  ChefHat,
  CheckCircle,
} from "lucide-react";
import { ReceiptDialog } from "./RecipientDialog";
import CartItemList from "./CartItem";

export const OrderSummary: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [tempDiscount, setTempDiscount] = useState("0");

  const {
    cart,
    currentOrder,
    discountPercent,
    completeOrder,
    setDiscountPercent,
    getOrderTotals,
  } = useStore();

  const orderTotals = getOrderTotals();

  const handleSendToKitchen = () => {
    if (cart.length > 0) {
      toast.success(`Order ${currentOrder.id} sent to kitchen`);
    } else {
      toast.error("No items in cart to send to kitchen");
    }
  };

  const handlePrintReceipt = () => {
    if (cart.length > 0) {
      setShowReceipt(true);
      toast.success("Receipt generated");
    } else {
      toast.error("No items in cart to print receipt");
    }
  };

  const handlePayment = () => {
    if (cart.length > 0) {
      const paymentMethods = [
        "Cash",
        "Credit Card",
        "Debit Card",
        "Mobile Payment",
      ];
      const selectedMethod =
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

      toast.success(
        `Payment of $${orderTotals.total.toFixed(
          2
        )} processed via ${selectedMethod}`
      );
      completeOrder(orderTotals);
    } else {
      toast.error("No items in cart to process payment");
    }
  };

  const handleApplyDiscount = () => {
    const discount = Number.parseFloat(tempDiscount) || 0;
    const clampedDiscount = Math.max(0, Math.min(100, discount));
    setDiscountPercent(clampedDiscount);
    setShowDiscountInput(false);
    toast(`Discount applied: ${clampedDiscount}%`);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Order Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {currentOrder.id}
          </h2>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
            {currentOrder.type}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="w-4 h-4 mr-1" />
          <span>{currentOrder.timestamp} (DRAFT)</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-1" />
            <span>Customer: {currentOrder.customer}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Utensils className="w-4 h-4 mr-1" />
            <span>Waiter: {currentOrder.waiter}</span>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <CartItemList />

      {/* Order Totals */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${orderTotals.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax (10%)</span>
          <span>${orderTotals.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Discount ({discountPercent}%)</span>
          <span>-${orderTotals.discount.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between font-semibold text-lg text-gray-900">
            <span>Total</span>
            <span>${orderTotals.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={handleSendToKitchen}
          >
            <ChefHat className="w-4 h-4" />
            Kitchen (K)
          </button>
          <button
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={handlePrintReceipt}
          >
            <Receipt className="w-4 h-4" />
            Receipt (R)
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => setShowDiscountInput(!showDiscountInput)}
          >
            <Percent className="w-4 h-4" />
            Discount (D)
          </button>
          <button
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handlePayment}
          >
            <CreditCard className="w-4 h-4" />
            Payment (P)
          </button>
        </div>
      </div>

      {/* Discount Input */}
      {showDiscountInput && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="number"
              value={tempDiscount}
              onChange={(e) => setTempDiscount(e.target.value)}
              placeholder="Discount %"
              min="0"
              max="100"
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
            />
            <button
              onClick={handleApplyDiscount}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Apply
            </button>
            <button
              onClick={() => setShowDiscountInput(false)}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Calculator */}
      {showCalculator && (
        <div className="border-t border-gray-200">
          <Calculator />
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && (
        <ReceiptDialog
          show={showReceipt}
          onClose={() => setShowReceipt(false)}
          currentOrder={currentOrder}
          cart={cart}
          orderTotals={orderTotals}
        />
      )}

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 grid grid-cols-2 gap-2">
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          onClick={() => {
            setShowCalculator(!showCalculator);
            toast(showCalculator ? "Calculator closed" : "Calculator opened");
          }}
        >
          <CalcIcon className="w-4 h-4" />
          Calculator
        </button>
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          onClick={() => {
            if (cart.length > 0) {
              toast.success(`Bill closed for order ${currentOrder.id}`);
              completeOrder(orderTotals);
            } else {
              toast.error("No items to close bill");
            }
          }}
        >
          <CheckCircle className="w-4 h-4" />
          Close Bill
        </button>
      </div>
    </div>
  );
};
