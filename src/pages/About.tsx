import { Link } from "react-router-dom";

import aurora from "@/assets/hero-aurora.jpg";
import { Footer, Header } from "@/components/site";
import { usePageTitle } from "@/lib/use-page-title";

export default function About() {
  usePageTitle("About — Student Sports by Ahsan Tahir");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden">
        <img src={aurora} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="font-mono text-xs font-bold tracking-[0.3em] text-lime">OUR STORY</p>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl">NEVER THE SAME</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-6 px-6 py-16 text-muted-foreground">
        <p>
          Student Sports was started by Ahsan Tahir with one idea: every player deserves gear that is
          ready for competition, whatever their budget.
        </p>
        <p>
          We carry rackets, paddles, shoes, strings, grips, bags and apparel for badminton, pickleball,
          padel, tennis and squash — each sport with its own range, chosen for how that game is really
          played.
        </p>
        <div className="grid gap-4 pt-6 sm:grid-cols-3">
          {[
            ["250+", "Products"],
            ["5", "Court sports"],
            ["100%", "Genuine gear"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-surface p-6 text-center">
              <p className="font-display text-4xl text-lime">{n}</p>
              <p className="mt-1 text-sm">{l}</p>
            </div>
          ))}
        </div>
        <div className="pt-6 text-center">
          <Link
            to="/shop"
            className="inline-block rounded-full bg-lime px-8 py-3 font-bold text-primary-foreground"
          >
            Shop the range
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
