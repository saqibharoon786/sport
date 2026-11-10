import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Footer, Header } from "@/components/site";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/catalog";
import { usePageTitle } from "@/lib/use-page-title";

export default function Cart() {
  usePageTitle("Your Cart — Student Sports");
  const { lines, setQty, remove } = useCart();
  const items = lines.map((l) => ({ ...l, p: getProduct(l.slug) })).filter((x) => x.p);
  const total = items.reduce((a, x) => a + x.p!.price * x.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-4xl sm:text-6xl">YOUR CART</h1>
        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-full bg-lime px-8 py-3 font-bold text-primary-foreground"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map(({ p, qty }) => (
                <div key={p!.slug} className="flex gap-4 rounded-2xl border border-border bg-surface p-3">
                  <img
                    src={`${p!.images[0]}&width=200`}
                    alt={p!.title}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link to={`/product/${p!.slug}`} className="line-clamp-2 text-sm font-semibold">
                      {p!.title}
                    </Link>
                    <p className="mt-1 text-sm font-bold">{formatPrice(p!.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1">
                        <button aria-label="Less" onClick={() => setQty(p!.slug, qty - 1)}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold">{qty}</span>
                        <button aria-label="More" onClick={() => setQty(p!.slug, qty + 1)}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        aria-label="Remove"
                        onClick={() => remove(p!.slug)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-fit rounded-2xl border border-border bg-surface p-6">
              <p className="font-mono text-xs font-bold tracking-widest text-lime">SUMMARY</p>
              <div className="mt-4 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>Delivery</span>
                <span className="text-lime">Free</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button className="mt-6 w-full rounded-full bg-lime py-3 font-bold text-primary-foreground">
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
