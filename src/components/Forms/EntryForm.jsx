import { useTranslation } from "../../hooks/useTranslation";
import { useViewState } from "../../hooks/useViewState";
import { useKeyPress } from "../../hooks/useKeyPress";
import { BackButton } from "../Buttons/BackButton";
import { SaveButton } from "../Buttons/SaveButton";
import { Input } from "../Inputs/Input";
import { addMinutes, format } from "date-fns";
import cx from "./EntryForm.module.scss";
import { useState, useId } from "react";

export const EntryForm = ({ title, onSubmit, entry }) => {
  const { goToDashboard } = useViewState();
  const { t } = useTranslation();

  const initialLabel = entry?.label ?? "";
  const initialAmount = entry?.amount?.toString() ?? "";
  const initialDate = entry
    ? format(entry.date, "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");

  const [label, setLabel] = useState(initialLabel);
  const [amount, setAmount] = useState(initialAmount);
  const [date, setDate] = useState(initialDate);

  const labelId = useId();
  const amountId = useId();
  const dateId = useId();

  const handleSubmit = () => {
    const entryIntent = {
      label,
      amount: Number(amount),
      date: addMinutes(new Date(date), new Date().getTimezoneOffset()),
    };

    onSubmit(entryIntent);
  };

  useKeyPress((event) => {
    if (event.key === "Escape") {
      goToDashboard();
    }
  });

  useKeyPress((event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  });

  return (
    <>
      <BackButton onClick={goToDashboard} />

      <form
        className={cx.form}
        onSubmit={(event) => {
          event.preventDefault();

          handleSubmit();
        }}
      >
        <h2 className={cx.title}>{title}</h2>

        <div className={cx.field}>
          <Input
            id={labelId}
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            label={t("labelInput")}
          />
        </div>

        <div className={cx.field}>
          <Input
            id={amountId}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            label={t("amountInput")}
          />
        </div>

        <div className={cx.field}>
          <Input
            id={dateId}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            label={t("dateInput")}
          />
        </div>

        <div className={cx.saveButtonContainer}>
          <SaveButton />
        </div>
      </form>
    </>
  );
};
