import { Button, Div, Text } from "@/components";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes, ReactElement, useRef } from "react";

interface Props {
  value: File | undefined;
  onChange: (file: File | undefined) => void;
  component?: ReactElement;
  componentContainerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export const FilePicker = ({ value, onChange, component, componentContainerProps }: Props) => {
  const inputFieldRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (inputFieldRef.current) {
      inputFieldRef.current.click();
    }
  };

  return (
    <Div>
      {component ? (
        <Div {...componentContainerProps} style={{ cursor: "pointer", ...componentContainerProps?.style }} onClick={handleImageClick}>
          {component}
        </Div>
      ) : (
        <Button preset="light" style={{ justifyContent: "flex-start" }} onClick={handleImageClick}>
          <Image src={"/plus-symbol.svg"} alt="" width={16} height={17} />
          <Text>{value ? "1 file selected" : "Upload files"}</Text>
        </Button>
      )}
      <input
        type="file"
        onChange={(e) => {
          const newValue = e.target.files?.[0];
          if (!newValue) return;
          onChange(newValue);
          e.target.value = "";
        }}
        ref={inputFieldRef}
        hidden
      />
    </Div>
  );
};
