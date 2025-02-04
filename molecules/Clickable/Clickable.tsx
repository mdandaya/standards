import { Div } from "@/components";
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import styles from "./Clickable.module.css";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  disabled?: boolean;
  noDisableFader?: boolean;
}

export const Clickable = forwardRef<HTMLDivElement, Props>(({ noDisableFader, ...props }: Props, ref) => {
  return (
    <Div
      ref={ref}
      {...props}
      onClick={!props.disabled ? props.onClick : undefined}
      className={`${styles.container} ${!props.disabled && styles.clickable} ${props.className}`}
    >
      {props.children}
      {props.disabled && <Div className={styles.disabler} style={noDisableFader ? { backgroundColor: "unset" } : {}} />}
    </Div>
  );
});
Clickable.displayName = "Clickable";
