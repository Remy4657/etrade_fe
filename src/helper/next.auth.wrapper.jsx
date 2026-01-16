import { SessionProvider } from "next-auth/react";
import I18Provider from '@/provider/i18n';

export default function NextAuthWrapper({
  children,
}) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
