import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Text.module.css";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  fontSize?: number;
  p?: boolean;
  b?: boolean;
  m?: boolean;
  /** Heavy bold. */
  hb?: boolean;
  underline?: boolean;
  textAlign?: CanvasTextAlign;
  i?: boolean;
  /** Width of the gradient in percent (i.e. 100%) */
  gradientPtoS?: boolean;
  gradientPtoP2?: boolean;
}

export const Text = ({
  className,
  fontSize,
  m,
  p,
  b,
  textAlign,
  underline,
  color,
  style,
  hb,
  i,
  gradientPtoP2,
  gradientPtoS,
  ...props
}: Props) => {
  return (
    <span
      {...props}
      className={`${styles.text} ${p ? styles.p : ""} ${m ? styles.m : ""} ${b ? styles.b : ""} ${hb ? styles.hb : ""}
      ${underline ? styles.underline : ""} ${i ? styles.italic : ""}
       ${gradientPtoP2 ? styles.gradientPtoP2 : ""} ${gradientPtoS ? styles.gradientPtoS : ""}
      ${className || ""}`}
      style={{ fontSize, textAlign, color, ...style }}
    />
  );
};
