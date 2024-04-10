import { useId } from "react";
import cx from "./Input.module.scss";

export const Input = ({
  id: externalId,
  value,
  onChange,
  name,
  type,
  label,
}) => {
  const internalId = useId();
  const id = externalId ?? internalId;

  return (
    <div className={cx.container}>
      <label className={cx.label} htmlFor={id}>
        {label}
      </label>

      <input
        className={cx.input}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};
