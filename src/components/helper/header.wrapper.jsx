"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "../footer/Footer";

export default function HeaderWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  return (
    <>
      {!isLoginPage ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
