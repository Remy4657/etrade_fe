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
    router.push(`/${newLocale}/${path}`);
  };
  return (
    <select
      value={locale}
      onChange={handleLanguageChange}
      style={{
        cursor: "pointer",
        width: "50px",
        padding: "5px",
        border: "none",
      }}
    >
      <option value="vi" style={{ cursor: "pointer" }}>
        VI
      </option>
      <option value="en" style={{ cursor: "pointer" }}>
        EN
      </option>
    </select>
  );
};
export default LangDropdown;
