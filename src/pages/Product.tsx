import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, Minus, Plus, Truck } from "lucide-react";

import { Footer, Header, ProductCard } from "@/components/site";
import { formatPrice, getProduct, products } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { usePageTitle } from "@/lib/use-page-title";

export default function Product() {
  const { slug = "" } = useParams();
  const p = getProduct(slug);
  usePageTitle(p ? `${p.title} — Student Sports` : "Product unavailable — Student Sports");

  if (!p) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-center">
        <div>
          <p className="font-display text-4xl">PRODUCT NOT FOUND</p>
          <Link to="/shop" className="mt-4 inline-block text-lime">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  return <ProductView key={p.slug} slug={p.slug} />;
}

function ProductView({ slug }: { slug: string }) {
  const p = getProduct(slug);
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  if (!p) return null;

  const related = products.filter((x) => x.sport === p.sport && x.slug !== p.slug).slice(0, 4);
  const active = p.images[img] ?? p.images[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl bg-foreground">
            <img src={active} alt={p.title} className="h-full w-full object-cover" />
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {p.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImg(i)}
                  className={`overflow-hidden rounded-xl ring-2 ${img === i ? "ring-lime" : "ring-transparent opacity-60"}`}
                >
                  <img src={`${src}&width=200`} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.3em] text-lime">
            {p.sport.toUpperCase()} / {p.type.toUpperCase()}
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">{p.title}</h1>
          <p className="mt-4 text-2xl font-bold">
            {formatPrice(p.price)}
            {p.compare && (
              <span className="ml-3 text-base font-normal text-muted-foreground line-through">
                {formatPrice(p.compare)}
              </span>
            )}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-4 rounded-full border border-border px-4 py-3">
              <button aria-label="Less" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-bold">{qty}</span>
              <button aria-label="More" onClick={() => setQty(qty + 1)}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                add(p.slug, qty);
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              className="flex-1 rounded-full bg-lime px-8 py-3 font-bold text-primary-foreground"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
          </div>
          <Link
            to="/cart"
            className="mt-3 block rounded-full border border-border py-3 text-center text-sm font-semibold hover:border-lime"
          >
            View cart
          </Link>
          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Truck className="h-4 w-4 text-lime" /> Free delivery across Pakistan
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-lime" /> 100% genuine product
            </li>
          </ul>
          {p.desc && (
            <div className="mt-8 border-t border-border pt-6">
              <p className="font-mono text-xs font-bold tracking-widest text-lime">DESCRIPTION</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          )}
        </div>
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl">YOU MAY ALSO LIKE</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
