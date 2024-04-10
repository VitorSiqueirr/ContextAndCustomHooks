import { Button } from "./Button";
import cx from "./NewEntryButton.module.scss";
import { useTranslation } from "../../hooks/useTranslation";

export const NewEntryButton = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Button className={cx.container} onClick={onClick}>
      ➕ {t("newEntryButton")}
    </Button>
  );
};
