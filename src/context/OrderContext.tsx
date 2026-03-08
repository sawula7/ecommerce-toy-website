"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
  placeOrder: (data: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">) => Promise<string>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  getUserOrders: (userId: string | null, email: string) => Order[];
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch {
      // Not logged in or network error — leave orders empty
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function placeOrder(
    data: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const order: Order = await res.json();
    setOrders((prev) => [order, ...prev]);
    return order.id;
  }

  async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    const now = new Date().toISOString();
    // Optimistic update
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, updatedAt: now } : o))
    );
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  function getUserOrders(userId: string | null, email: string): Order[] {
    return orders.filter(
      (o) => (userId && o.userId === userId) || o.userEmail === email
    );
  }

  return (
    <OrderContext.Provider
      value={{ orders, placeOrder, updateOrderStatus, getUserOrders, refreshOrders: fetchOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
