import { Div } from "@/components";
import colors from "@/theme/colors";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./CenterModal.module.css";

interface Props {
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
  children?: ReactNode;
  wrapperStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  closeOnOutsideClick?: boolean;
}

export const CenterModal = ({
  visible,
  setVisible,
  containerStyle,
  wrapperStyle,
  children,
  closeOnOutsideClick,
}: Props) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        visible &&
        outerRef.current?.contains(event.target as Node) &&
        !innerRef.current?.contains(event.target as Node)
      ) {
        setVisible?.(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [visible, setVisible]);

  const [opacity, setOpacity] = useState<number>(visible ? 1 : 0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpacity(visible ? 1 : 0);
    }, 10);

    if (visible) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }

    return () => clearTimeout(timeoutId);
  }, [visible]);

  const animation = {
    transition: `opacity 300ms ease-in-out`,
    opacity: opacity,
  };

  return (
    <Div
      ref={outerRef}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colors.background2 + 50,
        pointerEvents: visible ? "auto" : "none",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99,
        overflow: "auto",
        ...animation,
        ...wrapperStyle,
      }}
      onClick={() => {
        closeOnOutsideClick && setVisible?.(false);
      }}
    >
      <Div
        ref={innerRef}
        onClick={(e) => e.stopPropagation()}
        className={`${styles.container} ${visible ? styles.shown : styles.hidden}`}
        style={{ ...containerStyle }}
      >
        {children}
      </Div>
    </Div>
  );
};
