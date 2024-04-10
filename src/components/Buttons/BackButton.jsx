import cx from "./BackButton.module.scss";
import { Button } from "./Button";

export const BackButton = ({ onClick }) => {
  return (
    <Button className={cx.container} onClick={onClick}>
      ↩
    </Button>
  );
};
