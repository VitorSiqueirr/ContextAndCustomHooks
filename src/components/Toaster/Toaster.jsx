import { useEffect, useState } from "react";
import cx from "./Toaster.module.scss";

export const Toaster = ({ message, logic }) => {
  const [localMessage, setLocalMessage] = useState(message);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(false);

      setTimeout(() => {
        setLocalMessage(message);
        setShow(true);
      }, 300);

      const timer = setTimeout(() => {
        setShow(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [logic]);

  return (
    <div className={`${cx.notification} ${show ? cx.show : cx.hide}`}>
      <h1 className={cx.message}>{localMessage}</h1>
    </div>
  );
};
