"use client";

import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import { Product } from "@/data/products";

export type OrderStatus =
  | "pending"
  | "processing"
  | "handed_to_courier"
  | "delivered"
  | "cancelled";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  handed_to_courier: "Handed to Courier",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  handed_to_courier: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string | null;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    district: string;
    postalCode: string;
    notes: string;
  };
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

interface OrderContextValue {
  orders: Order[];
  placeOrder: (data: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">) => string;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getUserOrders: (userId: string | null, email: string) => Order[];
}

const OrderContext = createContext<OrderContextValue | null>(null);

const STORAGE_KEY = "edutoys_orders";

function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useReducer((_: Order[], next: Order[]) => next, []);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  function placeOrder(data: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">): string {
    const id = `ET-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();
    const order: Order = { ...data, id, status: "pending", createdAt: now, updatedAt: now };
    const updated = [order, ...orders];
    save(updated);
    setOrders(updated);
    return id;
  }

  function updateOrderStatus(id: string, status: OrderStatus) {
    const now = new Date().toISOString();
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status, updatedAt: now } : o
    );
    save(updated);
    setOrders(updated);
  }

  function getUserOrders(userId: string | null, email: string): Order[] {
    return orders.filter(
      (o) => (userId && o.userId === userId) || o.userEmail === email
    );
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
