import "./globals.css";

import { Archivo_Black, Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const displayFont = Archivo_Black({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(bodyFont.variable, displayFont.variable)}>
        {children}
      </body>
    </html>
  );
}
