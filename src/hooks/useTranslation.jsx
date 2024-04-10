import { useContext } from "react";
import { LanguageContext } from "../contexts/contexts/LanguageContext";
import { translate } from "../translations/translate";

export const useTranslation = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const t = (key) => translate(language, key);

  const formatNumber = Intl.NumberFormat(language, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format;

  const formatDate = Intl.DateTimeFormat(language).format;

  return {
    t,
    language,
    setLanguage,
    formatNumber,
    formatDate,
  };
};
