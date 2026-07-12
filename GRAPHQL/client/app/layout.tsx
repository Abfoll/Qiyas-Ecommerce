import type { Metadata } from "next";
import "./globals.css";
import ApolloWrapper from "./ApolloWrapper";

export const metadata: Metadata = {
  title: "NovaTrend | Premium E-Commerce",
  description: "Discover products you'll love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 min-h-screen antialiased">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}