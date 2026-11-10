import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { Footer, Header } from "@/components/site";
import { usePageTitle } from "@/lib/use-page-title";

export default function Contact() {
  usePageTitle("Contact — Student Sports by Ahsan Tahir");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.3em] text-lime">GET IN TOUCH</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">CONTACT US</h1>
          <p className="mt-4 text-muted-foreground">
            Questions about gear, sizing or your order? Send us a message.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone className="h-5 w-5 text-lime" /> +92 300 0000000
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 text-lime" /> info@studentsports.pk
            </li>
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 text-lime" /> Pakistan
            </li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4 rounded-2xl border border-border bg-surface p-6"
        >
          {sent ? (
            <p className="py-16 text-center font-semibold text-lime">Thanks! We'll get back to you soon.</p>
          ) : (
            <>
              <input
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
              <textarea
                required
                rows={5}
                placeholder="Message"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
              <button className="w-full rounded-full bg-lime py-3 font-bold text-primary-foreground">
                Send message
              </button>
            </>
          )}
        </form>
      </section>
      <Footer />
    </div>
  );
}
