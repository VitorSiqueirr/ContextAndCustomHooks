import { useContext } from "react";
import { useTranslation } from "./useTranslation";
import { NotificationContext } from "../contexts/contexts/NotificationContext";

export const useNotification = () => {
  const { t } = useTranslation();
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  const { setNotification, setKey } = context;

  const showNotification = (message) => {
    setNotification(`❕ ${t(message)}!`);
    setKey((prevKey) => (prevKey === 0 ? 1 : 0));
  };

  return {
    showNotification,
  };
};
