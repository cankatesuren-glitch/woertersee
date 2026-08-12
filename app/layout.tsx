import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WörterSee — German Vocabulary Game",
  description: "Learn German vocabulary with smart flashcard pools and spaced review.",
  icons: {
    icon: "/woertersee/woertersee-icon.svg",
    shortcut: "/woertersee/favicon.svg",
    apple: "/woertersee/apple-touch-icon.png",
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
