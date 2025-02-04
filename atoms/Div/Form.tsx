import { DetailedHTMLProps, FormEvent, HTMLAttributes, forwardRef } from "react";
import styles from "./Div.module.css";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  row?: boolean;
  gap?: number;
  onSubmit: () => void;
}

export const Form = forwardRef<HTMLFormElement, Props>(({ className = "", row, gap, style, ...props }: Props, ref) => {
  /** Default functionality onSubmit, such as preventDefault() so we don't navigate. */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit?.();
  };
  return (
    <>
      <form ref={ref} {...props} className={`${styles.div} ${row ? styles.row : ""} ${className ?? ""}`} style={{ gap: gap, ...style }} onSubmit={onSubmit} />
    </>
  );
});
Form.displayName = "Form";
