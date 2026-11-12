import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aman & Dhruvi | A Celebration of Togetherness",
  description: "Wedding celebrations of Aman and Dhruvi, January 2027.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}