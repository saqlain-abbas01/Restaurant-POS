import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "../store/useStore"; // update path to match your store file
import { toast } from "sonner"; // or your preferred toast lib

const CartItemList = () => {
  const { cart, updateQuantity, removeFromCart } = useStore();

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <ShoppingCart className="w-12 h-12 mb-2 text-gray-300" />
          <p className="text-center font-medium">Your order cart is empty</p>
          <p className="text-sm text-center">Add items from the menu</p>
        </div>
      ) : (
        <div className="space-y-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    updateQuantity(item.id, item.quantity - 1);
                    if (item.quantity === 1) {
                      toast(`Removed ${item.name} from cart`);
                    }
                  }}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    updateQuantity(item.id, item.quantity + 1);
                    toast(
                      `Updated ${item.name} quantity to ${item.quantity + 1}`
                    );
                  }}
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded transition-colors"
                  onClick={() => {
                    removeFromCart(item.id);
                    toast(`Removed ${item.name} from cart`);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItemList;
