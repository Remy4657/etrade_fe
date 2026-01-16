"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function I18nProvider({ children }) {
    const [messages, setMessages] = useState(null);
    const [locale, setLocale] = useState("en");

    useEffect(() => {
        const lang = Cookies.get("lang") || "en";
        setLocale(lang);

        import(`@/messages/${lang}.json`).then((m) => {
            setMessages(m.default);
        });
    }, []);

    if (!messages) return null;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
