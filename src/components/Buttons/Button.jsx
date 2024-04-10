import cx from "./Button.module.scss";

export const Button = ({ onClick, children, className }) => {
  return (
    <button className={`${cx.container} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
