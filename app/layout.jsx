import "../assets/styles/globals.css";
import rotify from "../assets/images/rotify.avif";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingWrapper from "./LoadingWrapper";

export const metadata = {
  description: "Best Homemade tiffin service in Meerut",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Best Homemade tiffin service in Meerut | ROTIFY"
          key="desc"
        />
        <meta
          property="og:title"
          content="Rotify App (formerly Public Tiffin Box)"
        />
        <meta
          property="og:description"
          content="Best Homemade tiffin service in Meerut | ROTIFY"
        />
        <meta property="og:image" content={rotify} />
      </head>
      <body>
        <LoadingWrapper>
          <Navbar />
          {children}
          <Footer />
        </LoadingWrapper>
      </body>
    </html>
  );
}
