import colors from "@/theme/colors";
import { isEmpty } from "lodash";
import { useState } from "react";
import PhoneInput, { CountryData, PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import styles from "./Input.module.css";

interface Props extends PhoneInputProps {
  value?: string;
  onChange: (newValue: string) => void;
}

export const PhoneNumberInput = ({ value = "", onChange, ...props }: Props) => {
  const [countryInfo, setCountryInfo] = useState<CountryData>();
  return (
    <>
      <PhoneInput
        specialLabel=""
        placeholder="i.e. 1 (123) 456 7890"
        country={countryInfo?.countryCode ? countryInfo.countryCode : "ca"}
        value={value}
        onChange={(phone, country) => {
          if (phone) {
            onChange(`+${phone}`);
          } else {
            onChange(phone);
          }
          if (!isEmpty(country)) setCountryInfo(country as CountryData);
        }}
        autoFormat={true}
        disableCountryGuess={true}
        {...props}
        inputClass={`${styles.input} ${props.containerClass || ""}`}
        inputStyle={{
          color: colors.primary,
          flex: 1,
          border: "2px solid lightgray",
          borderRadius: 16,
          padding: 15,
          paddingLeft: 60,
          fontSize: 15,
          width: "100%",
          ...props.inputStyle,
        }}
      />
    </>
  );
};
