import { Clickable, Div, Text } from "@/components";
import colors from "@/theme/colors";
import React from "react";

interface RadioButtonProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, checked, onChange }) => {
  return (
    <Clickable onClick={onChange}>
      <Div row gap={10}>
        <Div
          style={{
            border: "1px solid lightgray",
            padding: 2,
            borderRadius: "100%",
            backgroundColor: colors.background,
          }}
        >
          <Div
            style={{
              width: 18,
              height: 18,
              borderRadius: "100%",
              backgroundColor: checked ? colors.secondary : "transparent",
            }}
          ></Div>
        </Div>
        <Text>{label}</Text>
      </Div>
    </Clickable>
  );
};

export default RadioButton;
