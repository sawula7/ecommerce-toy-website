"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product, products as staticProducts } from "@/data/products";

interface ProductContextValue {
  products: Product[];
  addProduct: (data: Omit<Product, "id">) => Promise<void>;
  updateStock: (id: number, stock: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => {/* fallback to static products already in state */});
  }, []);

  async function addProduct(data: Omit<Product, "id">) {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const product: Product = await res.json();
    setProducts((prev) => [...prev, product]);
  }

  async function updateStock(id: number, stock: number) {
    // Optimistic update
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock } : p)));
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock }),
    });
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateStock }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}
