import styles from "./Input.module.css";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  placeholder?: string;
}

export const Select = (props: Props) => {
  const { placeholder } = props;
  return (
    <>
      <select
        {...props}
        className={`${styles.input} ${!props.value && styles.selectPlaceholder} ${
          props.disabled ? styles.disabled : ""
        } ${props.className}`}
        value={props.value || (props.onChange ? "" : undefined)}
        onChange={(e) => {
          if (e.target.value === placeholder) {
            props.onChange?.({ ...e, target: { ...e.target, value: "" } });
          } else {
            props.onChange?.(e);
          }
        }}
      >
        <option value={undefined}>{placeholder}</option>
        {props.children}
      </select>
    </>
  );
};
