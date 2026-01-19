"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LangDropdown = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    console.log("path: ", path)
    router.push(`/${newLocale}/${path}`);
  };
  return (
    <select
      value={locale}
      onChange={handleLanguageChange}
      style={{ width: "50px", padding: "0px", border: "none" }}
    >
      <option value="vi">VI</option>
      <option value="en">EN</option>
    </select>
  );
}

export default LangDropdown;