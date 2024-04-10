import { enTranslations } from "./en";
import { ptTranslations } from "./pt";

export const translate = (language, key) => {
  const translations = {
    en: enTranslations,
    pt: ptTranslations,
  };

  return translations[language][key];
};
