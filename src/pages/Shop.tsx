import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Footer, Header, ProductCard } from "@/components/site";
import { products, sportsList } from "@/lib/catalog";
import { usePageTitle } from "@/lib/use-page-title";

export default function Shop() {
  usePageTitle("Shop All Gear — Student Sports by Ahsan Tahir");
  const [params] = useSearchParams();
  const sport = params.get("sport") || undefined;
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("new");
  const [limit, setLimit] = useState(24);
  const list = useMemo(() => {
    let l = products.filter(
      (p) => (!sport || p.sport === sport) && p.title.toLowerCase().includes(q.toLowerCase()),
    );
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [sport, q, sort]);
  const label = sportsList.find((s) => s.key === sport)?.label ?? "All Products";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-lime">SHOP</p>
        <h1 className="mt-2 font-display text-4xl sm:text-6xl">{label.toUpperCase()}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{list.length} products</p>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          <Link
            to="/shop"
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${!sport ? "border-lime bg-lime text-primary-foreground" : "border-border"}`}
          >
            All
          </Link>
          {sportsList.map((s) => (
            <Link
              key={s.key}
              to={`/shop?sport=${s.key}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${sport === s.key ? "border-lime bg-lime text-primary-foreground" : "border-border"}`}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="flex-1 rounded-full border border-border bg-surface px-5 py-3 text-sm"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-border bg-surface px-5 py-3 text-sm"
          >
            <option value="new">Newest</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {list.slice(0, limit).map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
        {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No products found.</p>}
        {limit < list.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setLimit(limit + 24)}
              className="rounded-full border border-lime px-8 py-3 text-sm font-bold text-lime hover:bg-lime hover:text-primary-foreground"
            >
              Load more
            </button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
