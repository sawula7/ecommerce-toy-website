"use client";

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react";
import type { Product } from "@/data/products";

// ── Types ──────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: number }
  | { type: "SET_QTY"; id: number; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

// ── Reducer ────────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.id) };
    case "SET_QTY":
      if (action.qty < 1) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.id ? { ...i, quantity: action.qty } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  setQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addToCart  = useCallback((product: Product) => dispatch({ type: "ADD", product }), []);
  const removeFromCart = useCallback((id: number) => dispatch({ type: "REMOVE", id }), []);
  const setQuantity = useCallback((id: number, qty: number) => dispatch({ type: "SET_QTY", id, qty }), []);
  const clearCart  = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart   = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart  = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, isOpen: state.isOpen, totalItems, subtotal, addToCart, removeFromCart, setQuantity, clearCart, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
