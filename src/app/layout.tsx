import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Recipe Share",
  description:
    "Explore a vast collection of culinary delights on our collaborative recipe sharing website. Whether you're a seasoned chef or a novice in the kitchen, our platform welcomes users to contribute and discover an array of mouthwatering recipes from around the globe. With a diverse community of food enthusiasts, you can browse, share, and experiment with recipes, fostering creativity and culinary inspiration. Join us in celebrating the joy of cooking as we connect individuals through their love for delicious food and shared experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
