import { Div, Text } from "@/components";
import Image from "next/image";
import { CSSProperties } from "react";

interface Props {
  name?: string;
  photoUrl?: string | null;
  size?: number;
  style?: CSSProperties;
}

/**
 *
 * @returns
 */
export const Avatar = ({ name, photoUrl, size = 52, style }: Props) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter((n) => n.length > 0)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  const containerSize = size ? size : 52;
  const fontSize = containerSize * 0.45;

  return (
    <Div
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt="Profile"
          fill
          style={{ objectFit: "cover" }}
          sizes="100%"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <Text style={{ fontSize, color: "#2A5934" }}>{name && getInitials(name)}</Text>
      )}
    </Div>
  );
};
