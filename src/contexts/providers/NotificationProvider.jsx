import { useState } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import { Toaster } from "../../components/Toaster/Toaster";

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState();
  const [key, setKey] = useState(0);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        setKey,
      }}
    >
      <Toaster message={notification} logic={key} />
      {children}
    </NotificationContext.Provider>
  );
};
