import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Line = { slug: string; qty: number };
type Ctx = {
  lines: Line[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  count: number;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    try {
      setLines(JSON.parse(localStorage.getItem("ss-cart") || "[]"));
    } catch {}
  }, []);
  const save = (l: Line[]) => {
    setLines(l);
    localStorage.setItem("ss-cart", JSON.stringify(l));
  };
  const add = (slug: string, qty = 1) => {
    const ex = lines.find((l) => l.slug === slug);
    save(ex ? lines.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l)) : [...lines, { slug, qty }]);
  };
  const setQty = (slug: string, qty: number) =>
    save(qty <= 0 ? lines.filter((l) => l.slug !== slug) : lines.map((l) => (l.slug === slug ? { ...l, qty } : l)));
  const remove = (slug: string) => save(lines.filter((l) => l.slug !== slug));
  const count = lines.reduce((a, l) => a + l.qty, 0);
  return <CartCtx.Provider value={{ lines, add, setQty, remove, count }}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
