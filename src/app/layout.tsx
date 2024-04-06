import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
