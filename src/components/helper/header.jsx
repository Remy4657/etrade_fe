"use client";

/** next */
import { usePathname } from "next/navigation";

import HeaderOne from "@/components/header/HeaderOne";

export default function Header() {
  const pathname = usePathname();
  console.log("pathname: ", pathname);
  const isLoginPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  return (
    <>
      {!isLoginPage ? (
        <>
          <HeaderOne />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
