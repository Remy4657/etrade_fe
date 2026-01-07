import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const I18Provider = async ({ children }) => {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>

  );
}
export default I18Provider;

