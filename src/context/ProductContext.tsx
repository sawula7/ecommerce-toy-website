"use client";

import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import { Product, products as staticProducts } from "@/data/products";

interface ProductContextValue {
  products: Product[];
  addProduct: (data: Omit<Product, "id">) => void;
  updateStock: (id: number, stock: number) => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

const STORAGE_KEY = "edutoys_products";

function loadProducts(): Product[] {
  if (typeof window === "undefined") return staticProducts;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return staticProducts;
    return JSON.parse(stored);
  } catch {
    return staticProducts;
  }
}

function save(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useReducer(
    (_: Product[], next: Product[]) => next,
    staticProducts
  );

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  function addProduct(data: Omit<Product, "id">) {
    const id = Math.max(...products.map((p) => p.id), 0) + 1;
    const updated = [...products, { ...data, id }];
    save(updated);
    setProducts(updated);
  }

  function updateStock(id: number, stock: number) {
    const updated = products.map((p) => (p.id === id ? { ...p, stock } : p));
    save(updated);
    setProducts(updated);
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
