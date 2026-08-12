import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WörterSee — German Vocabulary Game",
  description: "Learn German vocabulary with smart flashcard pools and spaced review.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
