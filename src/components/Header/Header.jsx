import { useTranslation } from "../../hooks/useTranslation";
import cx from "./Header.module.scss";

export const Header = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className={cx.container}>
      <h1 className={cx.title}>{t("appTitle")}</h1>

      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className={cx.languageSelector}
      >
        <option value="en">EN</option>
        <option value="pt">PT</option>
      </select>
    </header>
  );
};
