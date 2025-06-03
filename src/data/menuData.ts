import {
  Pizza,
  Beef,
  Salad,
  IceCream,
  Coffee,
  Fish,
  Cookie,
} from "lucide-react";
import type { MenuItem, Category } from "../types/types";

export const menuItems: MenuItem[] = [
  // Pizza
  { id: 1, name: "Margherita Pizza", price: 12.99, category: "Pizza" },
  { id: 2, name: "Pepperoni Pizza", price: 14.99, category: "Pizza" },
  { id: 3, name: "Supreme Pizza", price: 18.99, category: "Pizza" },
  { id: 4, name: "Hawaiian Pizza", price: 16.99, category: "Pizza" },

  // Burgers
  { id: 5, name: "Classic Burger", price: 9.99, category: "Burger" },
  { id: 6, name: "Cheese Burger", price: 10.99, category: "Burger" },
  { id: 7, name: "Bacon Burger", price: 12.99, category: "Burger" },
  { id: 8, name: "Veggie Burger", price: 8.99, category: "Burger" },

  // Appetizers
  { id: 9, name: "Chicken Wings", price: 8.99, category: "Appetizers" },
  { id: 10, name: "Mozzarella Sticks", price: 6.99, category: "Appetizers" },
  { id: 11, name: "Onion Rings", price: 5.99, category: "Appetizers" },
  { id: 12, name: "Garlic Bread", price: 4.99, category: "Appetizers" },

  // Main Course
  { id: 13, name: "Grilled Chicken", price: 15.99, category: "Main Course" },
  { id: 14, name: "Beef Steak", price: 22.99, category: "Main Course" },
  { id: 15, name: "Fish & Chips", price: 13.99, category: "Main Course" },
  { id: 16, name: "Pasta Carbonara", price: 11.99, category: "Main Course" },

  // Desserts
  { id: 17, name: "Chocolate Cake", price: 6.99, category: "Desserts" },
  { id: 18, name: "Ice Cream", price: 4.99, category: "Desserts" },
  { id: 19, name: "Tiramisu", price: 7.99, category: "Desserts" },
  { id: 20, name: "Cheesecake", price: 6.99, category: "Desserts" },

  // Drinks
  { id: 21, name: "Coca Cola", price: 2.99, category: "Drinks" },
  { id: 22, name: "Fresh Orange Juice", price: 3.99, category: "Drinks" },
  { id: 23, name: "Coffee", price: 2.49, category: "Drinks" },
  { id: 24, name: "Iced Tea", price: 2.99, category: "Drinks" },

  // Sides
  { id: 25, name: "French Fries", price: 3.99, category: "Sides" },
  { id: 26, name: "Coleslaw", price: 2.99, category: "Sides" },
  { id: 27, name: "Mashed Potatoes", price: 3.49, category: "Sides" },
  { id: 28, name: "Side Salad", price: 4.99, category: "Sides" },
];

export const categories: Category[] = [
  { name: "Pizza", icon: Pizza },
  { name: "Burger", icon: Beef },
  { name: "Salad", icon: Salad },
  { name: "Desserts", icon: IceCream },
  { name: "Drinks", icon: Coffee },
  { name: "Appetizers", icon: Cookie },
  { name: "Seafood", icon: Fish },
];

export const menuCategories = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Drinks",
  "Sides",
];
