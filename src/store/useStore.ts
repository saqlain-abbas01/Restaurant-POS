import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  CartItem,
  MenuItem,
  Order,
  OrderTotals,
  OrderType,
} from "../types/types";

interface AppStore {
  // Cart state
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;

  // Orders state
  orders: Order[];
  currentOrder: Order;
  createNewOrder: () => Order;
  completeOrder: (orderTotals: OrderTotals) => void;
  updateCurrentOrderType: (type: OrderType) => void;
  updateOrder: (updated: Order) => void;

  // Discount state
  discountPercent: number;
  setDiscountPercent: (percent: number) => void;

  // Computed values
  getOrderTotals: () => OrderTotals;

  //close category
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;

  //search for dishes
  searchDishes: string;
  setSearchDishes: (query: string) => void;

  //search for dishes
  searchOrders: string;
  setSearchOrders: (query: string) => void;
}

const generateOrderId = () =>
  `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;

const createInitialOrder = (): Order => ({
  id: generateOrderId(),
  timestamp: new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }),
  customer: "Guest",
  waiter: "Server",
  type: "DINE IN",
  status: "DRAFT",
});

export const useStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      activeCategory: "Pizza",
      setActiveCategory: (category: string) =>
        set({ activeCategory: category }),
      // Cart state
      cart: [],

      searchDishes: "",

      setSearchDishes: (query: string) => {
        set({ searchDishes: query });
      },

      searchOrders: "",

      setSearchOrders: (query: string) => {
        console.log("query", query);
        set({ searchOrders: query });
      },

      addToCart: (item: MenuItem) => {
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }
          return {
            cart: [...state.cart, { ...item, quantity: 1 }],
          };
        });
      },

      removeFromCart: (id: number) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      // Orders state
      orders: [
        // Sample order for testing
        {
          id: "ORD-1234",
          timestamp: "12:30 PM",
          customer: "Sample Customer",
          waiter: "Sample Waiter",
          type: "DINE IN",
          status: "COMPLETED",
          items: [
            {
              id: 1,
              name: "Margherita Pizza",
              price: 12.99,
              category: "Pizza",
              quantity: 2,
            },
            {
              id: 5,
              name: "Classic Burger",
              price: 9.99,
              category: "Burger",
              quantity: 1,
            },
          ],
          total: 35.97,
        },
      ],

      currentOrder: createInitialOrder(),

      createNewOrder: () => {
        const state = get();
        const { cart, currentOrder } = state;

        // Calculate total price from cart
        const total = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        const newOrder = {
          ...currentOrder,
          id: generateOrderId(),
          items: cart,
          total,
        };

        set({
          currentOrder: newOrder,
          orders: [...state.orders, newOrder],
          cart: [],
          discountPercent: 0,
        });

        return newOrder;
      },

      completeOrder: (orderTotals: OrderTotals) => {
        const { currentOrder, cart } = get();
        if (cart.length === 0) return;

        const completedOrder: Order = {
          ...currentOrder,
          status: "COMPLETED",
          items: [...cart],
          total: orderTotals.total,
        };

        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === currentOrder.id ? completedOrder : order
          ),
          cart: [],
          discountPercent: 0,
        }));
      },

      updateOrder: (updatedOrder) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          ),
        })),

      updateCurrentOrderType: (type: OrderType) => {
        set((state) => ({
          currentOrder: {
            ...state.currentOrder,
            type: type.toUpperCase() as "DINE IN" | "TAKE AWAY" | "DELIVERY",
          },
        }));
      },

      // Discount state
      discountPercent: 0,
      setDiscountPercent: (percent: number) => {
        set({ discountPercent: Math.max(0, Math.min(100, percent)) });
      },

      // Computed values
      getOrderTotals: () => {
        const { cart, discountPercent } = get();
        const subtotal = cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const tax = subtotal * 0.1;
        const discount = subtotal * (discountPercent / 100);
        const total = subtotal + tax - discount;

        return { subtotal, tax, discount, total };
      },

      isSidebarOpen: true,
      setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: "restaurant-pos-store",
    }
  )
);
