import { CSSProperties, DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

import SimpleBar from "simplebar-react";

import "simplebar-react/dist/simplebar.min.css";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  innerStyle?: CSSProperties;
  innerClassName?: string;
}

/**
 * Highly experimental and unpredictable. Use carefully as development is ongoing.
 */
export const Scrollable: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ className = "", children, innerClassName, innerStyle, ...props }, ref) => {
    return (
      <div className="flex relative w-full h-full" {...props}>
        <SimpleBar
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          scrollableNodeProps={{ ref }}
        >
          {children}
        </SimpleBar>
      </div>
    );
  }
);
