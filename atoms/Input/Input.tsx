import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, Ref } from "react";
import styles from "./Input.module.css";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  showArrows?: boolean;
  /** @deprecated use readOnly so user can still read past the ellipses*/
  disabled?: boolean;
}
export const Input = forwardRef(({ showArrows, ...props }: Props, ref) => {
  return (
    <input
      ref={ref as Ref<HTMLInputElement>}
      onWheel={(e) => {
        if (props.type === "number") e.target.addEventListener("wheel", disableScrollToIncrement, { passive: false });
      }}
      {...props}
      className={`${styles.input} ${props.readOnly || props.disabled ? styles.disabled : ""} ${props.type === "datetime-local" ? styles.date : ""} ${
        showArrows ? "" : styles.hideArrows
      } ${props.className || ""}`}
      value={props.value || (props.onChange ? "" : undefined)}
    />
  );
});
Input.displayName = "Input";
const disableScrollToIncrement = (e: Event) => {
  e.preventDefault();
};
