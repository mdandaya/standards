import styles from "./Checkbox.module.css";
import React, { ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, disabled, ...otherProps }) => {
  return (
    <label className={styles.checkboxContainer} {...otherProps}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className={styles.checkboxInput} />
      <span className={styles.customCheckbox} />
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
