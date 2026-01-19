import Link from "next/link";
import { useTranslations } from "next-intl";
const HeaderQuickLink = () => {
  const t = useTranslations("Authentication");

  return (
    <div className="header-top-link">
      <ul className="quick-link">
        <li>
          <Link href="/sign-up">{t("SignUp")}</Link>
        </li>
        <li>
          <Link href="/sign-in">{t("SignIn")}</Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderQuickLink;
