import { Div } from "@/components";
import { ReactNode, useEffect, useRef } from "react";
import styles from "./SideModal.module.css";
interface Props {
  visible: boolean | undefined;
  setVisible?: (visible: boolean) => void;
  children?: ReactNode;
  disableClickOutClose?: boolean;
  onOutsideClick?: () => void;
}

export const SideModal = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = props.visible;

  useEffect(() => {
    if (props.disableClickOutClose) return;
    const handleOutSideClick = (event: MouseEvent) => {
      if (visible && ref.current?.contains(event.target as Node)) {
        props.onOutsideClick?.();
        props.setVisible?.(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, visible, props]);

  return (
    <>
      <Div
        ref={ref}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#00000025",
          display: visible ? "flex" : "none",
          zIndex: 99,
        }}
      ></Div>
      <Div onClick={(e) => e.stopPropagation()} className={`${styles.container} ${visible === true ? styles.shown : visible === false ? styles.hidden : null}`}>
        {props.children}
      </Div>
    </>
  );
};
