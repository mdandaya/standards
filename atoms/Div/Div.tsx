import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import styles from "./Div.module.css";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  row?: boolean;
  gap?: number;
}

export const Div = forwardRef<HTMLDivElement, Props>(({ className = "", row, gap, style, ...props }: Props, ref) => {
  return (
    <>
      <div ref={ref} {...props} className={`${styles.div} ${row ? styles.row : ""} ${className ?? ""}`} style={{ gap: gap, ...style }} />
    </>
  );
});
Div.displayName = "Div";
