import { Metadata } from "next";
import { ReactNode } from "react";
// @ts-ignore
import "@/assets/styles/globals.css";
import rotify from "../assets/images/rotify.avif";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingWrapper from "./LoadingWrapper";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "ROTIFY",
  description: "Best Homemade tiffin service in Meerut",
  openGraph: {
    title: "Rotify App (formerly Public Tiffin Box)",
    description: "Best Homemade tiffin service in Meerut | ROTIFY",
    images: [{ url: rotify.src }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LoadingWrapper>
            <Navbar />
            {children}
            <Footer />
          </LoadingWrapper>
        </Providers>
      </body>
    </html>
  );
}
