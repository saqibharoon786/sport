import data from "@/data/products.json";

export type Product = {
  slug: string;
  title: string;
  type: string;
  sport: string;
  price: number;
  compare: number | null;
  images: string[];
  desc: string;
};

export const products = data as Product[];

export const sportsList = [
  { key: "badminton", label: "Badminton" },
  { key: "pickleball", label: "Pickleball" },
  { key: "padel", label: "Padel" },
  { key: "tennis", label: "Tennis" },
  { key: "squash", label: "Squash" },
  { key: "footwear", label: "Footwear" },
  { key: "apparel", label: "Apparel" },
] as const;

export const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
