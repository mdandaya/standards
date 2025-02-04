import styles from "./Button.module.css";
import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  preset?: "negative" | "light" | "white" | "dark" | "sand" | "sea";
  icon?: string;
  iconAlt?: string;
}

export const Button = ({ children, icon, iconAlt, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`
        ${styles.button}
        ${props.preset === "negative" ? styles.negative : ""} 
        ${props.preset === "white" ? styles.white : ""}
        ${props.preset === "dark" ? styles.dark : ""}
        ${props.preset === "light" ? styles.light : ""}
        ${props.preset === "sand" ? styles.sand : ""}
        ${props.preset === "sea" ? styles.sea : ""}
        ${props.disabled ? styles.disabled : ""} 
        ${props.className}`}
    >
      {children}
      {icon && iconAlt ? <Image src={icon} alt={iconAlt} width={15} height={15} /> : null}
    </button>
  );
};
