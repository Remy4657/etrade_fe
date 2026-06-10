"use client";

/** next */
import { usePathname } from "next/navigation";

import Header from "@/components/header/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  console.log("pathname: ", pathname);
  const isLoginPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  return (
    <>
      {!isLoginPage ? (
        <>
          <Header />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
