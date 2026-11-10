import { Link } from "react-router-dom";
import { Check, Circle, Crosshair, LayoutGrid, Rows3, Square } from "lucide-react";

import aurora from "@/assets/hero-aurora.jpg";
import { Footer, Header, ProductCard } from "@/components/site";
import { products } from "@/lib/catalog";
import { usePageTitle } from "@/lib/use-page-title";

const perks = [
  ["Free Delivery", "On orders across Pakistan"],
  ["Click & Collect", "Pick up in-store, same day"],
  ["Built for Competition", "Tournament-ready out of the box"],
  ["5 Sports, 1 Standard", "Badminton to squash"],
];
const sports = [
  ["01 / SHUTTLE", Crosshair, "BADMINTON", "badminton", "RACKETS, SHOES, STRING"],
  ["02 / KITCHEN", Rows3, "PICKLEBALL", "pickleball", "PADDLES, BALLS, BAGS"],
  ["03 / GLASS", Square, "PADEL", "padel", "FULL COLLECTION"],
  ["04 / BASELINE", Circle, "TENNIS", "tennis", "RACKETS, STRING"],
  ["05 / T-ZONE", LayoutGrid, "SQUASH", "squash", "RACKETS, STRING"],
] as const;

function Row({ title, sport }: { title: string; sport: string }) {
  const list = products.filter((p) => p.sport === sport).slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl sm:text-5xl">{title}</h2>
        <Link
          to={`/shop?sport=${sport}`}
          className="shrink-0 font-mono text-xs font-bold tracking-widest text-lime"
        >
          VIEW ALL →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle("Student Sports by Ahsan Tahir — Badminton, Pickleball, Padel, Tennis & Squash");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden md:h-[90vh]">
        <img
          src={aurora}
          alt=""
          width={1920}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Header overlay />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="font-display text-5xl leading-none sm:text-7xl md:text-8xl lg:text-[9rem]">
            STUDENT <span className="text-lime">SPORTS</span>
          </h1>
          <p className="mt-3 font-mono text-xs tracking-[0.4em] text-muted-foreground sm:text-sm">
            BY AHSAN TAHIR
          </p>
          <p className="mt-4 font-mono text-sm tracking-[0.4em] text-lime">NEVER THE SAME</p>
          <Link
            to="/shop"
            className="mt-8 rounded-full bg-lime px-8 py-3 font-bold text-primary-foreground"
          >
            Shop now
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 border-y border-border sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(([t, d]) => (
          <div key={t} className="flex gap-3 px-6 py-5 lg:border-r">
            <Check className="mt-0.5 h-4 w-4 text-lime" />
            <div>
              <p className="text-sm font-bold">{t}</p>
              <p className="text-xs text-muted-foreground">{d}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-lime">CHOOSE YOUR COURT</p>
        <h2 className="mb-10 mt-3 font-display text-4xl sm:text-6xl">SHOP BY SPORT</h2>
        <div className="grid border border-border sm:grid-cols-2 lg:grid-cols-5">
          {sports.map(([k, Icon, n, key, c]) => (
            <Link
              key={n}
              to={`/shop?sport=${key}`}
              className="group bg-surface p-6 transition-colors hover:bg-card lg:border-r lg:last:border-r-0"
            >
              <p className="font-mono text-xs text-muted-foreground">{k}</p>
              <Icon className="mt-6 h-7 w-7 text-lime" strokeWidth={1.5} />
              <h3 className="mt-8 font-display text-2xl">{n}</h3>
              <p className="mt-4 font-mono text-xs font-bold tracking-widest text-lime">
                {c} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Row title="BADMINTON" sport="badminton" />
      <Row title="PICKLEBALL" sport="pickleball" />
      <Row title="FOOTWEAR" sport="footwear" />
      <Row title="APPAREL" sport="apparel" />
      <Footer />
    </div>
  );
}
