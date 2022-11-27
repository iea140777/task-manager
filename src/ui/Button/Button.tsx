import React from "react";

import classNames from "classnames";

import styles from "./index.module.scss";

interface ButtonProps {
  onClickHandler: () => void;
  label: string;
  className?: string;
}

function Button({
  onClickHandler,
  label,
  className,
}: ButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={classNames(styles.button, className)}
    >
      {label}
    </button>
  );
}

export { Button };
