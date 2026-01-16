"use client"
import { useEffect } from 'react';
import { SessionProvider } from "next-auth/react";

export default function NextAuthWrapper({
  children,
}) {
  // useEffect(() => {
  //   window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
  // }, []);
  return (
    <>

      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
