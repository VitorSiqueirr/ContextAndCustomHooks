import cx from "./DashboardEntry.module.scss";
import { useTranslation } from "../../hooks/useTranslation";
import { Button } from "../Buttons/Button";

export const DashboardEntry = ({ entry, onEdit, onDelete }) => {
  const { label, date, amount } = entry;

  const { formatNumber, formatDate } = useTranslation();

  return (
    <li className={cx.container}>
      <div className={cx.leftRow}>
        <span>{label}</span>

        <span>{formatDate(date)}</span>
      </div>

      <div className={cx.rightRow}>
        <span>$ {formatNumber(amount.toFixed(2))}</span>

        <div className={cx.buttonContainer}>
          <Button className={cx.editButton} onClick={onEdit}>
            ✏️
          </Button>

          <Button className={cx.deleteButton} onClick={onDelete}>
            🗑️
          </Button>
        </div>
      </div>
    </li>
  );
};
