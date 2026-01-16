"use client";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

export default function LanguageSwitcher() {
    const t = useTranslations("Home");
    const changeLang = (lang) => {
        Cookies.set("lang", lang);
        window.location.reload(); // reload để load message mới
    };

    return (
        <>
            <button onClick={() => changeLang("en")}>EN</button>
            <button onClick={() => changeLang("vi")}>VI</button>
            <h1>{t("title")}</h1>
        </>
    );
}
