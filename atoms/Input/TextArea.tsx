import { useEffect, useRef } from "react";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface Props extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  /** @deprecated use readOnly so user can still read past the ellipses */
  disabled?: boolean;
  enterKeySubmits?: boolean;
}

export const TextArea = ({ enterKeySubmits, style, ...props }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        const minHeight = style?.height ? (typeof style.height === "number" ? `${style.height}px` : style.height) : `${125}px`; // Default minimum height

        textarea.style.height = "auto"; // Reset height to allow shrinking
        textarea.style.height = `${Math.max(textarea.scrollHeight, parseInt(minHeight))}px`; // Use max of content height and min height
      }
    };

    // Adjust height initially and whenever `value` changes
    adjustHeight();
  }, [props.value, style?.height]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (enterKeySubmits && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent adding a new line
      // Trigger the form submission programmatically
      const form = event.currentTarget.closest("form");
      form?.requestSubmit();
    }
  };

  return (
    <textarea
      ref={textareaRef}
      onKeyDown={handleKeyDown}
      {...props}
      className={`${styles.input} ${styles.textArea} ${(props.readOnly || props.disabled) && styles.disabled} ${props.className}`}
      style={{
        ...style,
        height: "auto", // Let the logic determine the height dynamically
        minHeight: style?.height || "125px", // Apply the provided style height as minimum height
      }}
      rows={1} // Use 1 row to allow dynamic height adjustment
    />
  );
};
