import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, sportsList, type Product } from "@/lib/catalog";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none tracking-wide ${className}`}>
      STUDENT <span className="text-lime">SPORTS</span>
      <span className="mt-0.5 block font-mono text-[0.38em] tracking-[0.25em] text-muted-foreground">BY AHSAN TAHIR</span>
    </span>
  );
}

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <div className={overlay ? "absolute inset-x-0 top-0 z-30" : "sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur"}>
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="shrink-0 lg:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/"><Logo className="text-xl sm:text-2xl" /></Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {sportsList.slice(0, 5).map((s) => (
            <Link key={s.key} to={`/shop?sport=${s.key}`} className="hover:text-lime">{s.label}</Link>
          ))}
          <Link to="/shop" className="hover:text-lime">All Products</Link>
          <Link to="/about" className="hover:text-lime">About</Link>
          <Link to="/contact" className="hover:text-lime">Contact</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-4">
          <Link to="/shop" aria-label="Search"><Search className="h-5 w-5" /></Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-lime px-1 text-[10px] font-bold text-primary-foreground">{count}</span>
          </Link>
        </div>
      </header>
      {open && (
        <nav className="mx-4 mb-4 flex flex-col gap-1 rounded-xl border border-border bg-background p-3 font-semibold lg:hidden">
          {sportsList.map((s) => (
            <Link key={s.key} to={`/shop?sport=${s.key}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-surface">{s.label}</Link>
          ))}
          <Link to="/shop" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-surface">All Products</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-surface">About</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-surface">Contact</Link>
        </nav>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-2xl" />
          <p className="mt-4 text-sm text-muted-foreground">Tournament-ready gear for badminton, pickleball, padel, tennis and squash.</p>
        </div>
        <div>
          <p className="font-mono text-xs font-bold tracking-widest text-lime">SHOP</p>
          <ul className="mt-4 space-y-2 text-sm">
            {sportsList.map((s) => (
              <li key={s.key}><Link to={`/shop?sport=${s.key}`} className="text-muted-foreground hover:text-foreground">{s.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs font-bold tracking-widest text-lime">COMPANY</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About us</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            <li><Link to="/cart" className="text-muted-foreground hover:text-foreground">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs font-bold tracking-widest text-lime">NEWSLETTER</p>
          <p className="mt-4 text-sm text-muted-foreground">New drops and offers, straight to your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
            <input type="email" placeholder="Email" className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm" />
            <button className="rounded-full bg-lime px-4 text-sm font-bold text-primary-foreground">Join</button>
          </form>
        </div>
      </div>
      <p className="border-t border-border py-5 text-center text-xs text-muted-foreground">© 2026 Student Sports by Ahsan Tahir. All rights reserved.</p>
      <a href="https://wa.me/923000000000" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" className="fixed bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-lime px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </footer>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <Link to={`/product/${p.slug}`} className="relative block aspect-square overflow-hidden bg-foreground">
        <img src={`${p.images[0]}&width=500`} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {p.compare && <span className="absolute left-3 top-3 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">SALE</span>}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] tracking-widest text-lime">{p.type.toUpperCase()}</p>
        <Link to={`/product/${p.slug}`} className="mt-1 line-clamp-2 text-sm font-semibold hover:text-lime">{p.title}</Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <p className="text-sm font-bold">
            {formatPrice(p.price)}
            {p.compare && <span className="ml-2 text-xs font-normal text-muted-foreground line-through">{formatPrice(p.compare)}</span>}
          </p>
          <button onClick={() => add(p.slug)} aria-label="Add to cart" className="rounded-full bg-lime p-2 text-primary-foreground"><ShoppingBag className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
