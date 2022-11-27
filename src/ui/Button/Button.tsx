import React from "react";

import styles from "./index.module.scss";

interface ButtonProps {
  onClickHandler: () => void;
  label: string;
}

function Button({ onClickHandler, label }: ButtonProps): React.ReactElement {
  return (
    <button type="button" onClick={onClickHandler} className={styles.button}>
      {label}
    </button>
  );
}

export { Button };
