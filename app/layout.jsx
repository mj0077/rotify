import { Jacques_Francois, Poppins } from "next/font/google";
import { Sansita } from "next/font/google";
import "../assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jacquesFont = Sansita({
  weight: '400',
  subsets: ["latin"],
});

export const metadata = {
  title: "Rotify App (formerly Public Tiffin Box)",
  description: "Best Homemade tiffin service in Meerut",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <title>Rotify</title>
      <body className={` ${jacquesFont.className} body`}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
