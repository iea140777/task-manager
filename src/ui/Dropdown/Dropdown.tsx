import React, { useState } from "react";

import classNames from "classnames";

import styles from "./index.module.scss";

interface DropdownProps {
  values: string[];
  initialValue: string;
  onChangeValue: (value: string) => void;
}

function Dropdown({
  values,
  initialValue,
  onChangeValue,
}: DropdownProps): React.ReactElement {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const setValue = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    onChangeValue(
      target.textContent != null ? target.textContent : initialValue
    );
  };

  const renderDropdownValues = (): JSX.Element[] => {
    return values.map((value, index) => (
      <div
        className={styles.value}
        key={index}
        role="button"
        onClick={setValue}
      >
        {value}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.value}
        role="button"
        onClick={() => setDropdownOpen((prevState) => !prevState)}
      >
        {initialValue}
        <div
          className={classNames(styles.dropdown, {
            [styles.hidden]: !isDropdownOpen,
          })}
        >
          {renderDropdownValues()}
        </div>
      </div>
    </div>
  );
}

export { Dropdown };
