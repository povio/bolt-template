import { type Config } from "tailwindcss";
import tailwindcssReactAriaComponents from "tailwindcss-react-aria-components";

const pxToRem = (px: number) => `${px / 16}rem`;

const baseTailwindConfig: Omit<Config, "content"> = {
  theme: {
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
    },
    borderRadius: {
      none: "0rem",
    },
    maxWidth: {
      none: "none",
      full: "100%",
      modal: pxToRem(520),
      toast: pxToRem(720),
    },
    spacing: {
      "0": "0rem",
    },
    backdropBlur: {},
    blur: {},
    boxShadow: {
      none: "none",
    },
    rotate: {
      "0": "0deg",
      "45": "45deg",
      "90": "90deg",
      "180": "180deg",
      "270": "270deg",
      "360": "360deg",
    },
    screens: {
      // why are breakpoints in rems? read this: https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/
      sm: pxToRem(380),
      md: pxToRem(600),
      lg: pxToRem(1280),
      xl: pxToRem(1680),
    },
    keyframes: {
      "drawer-slide-right": {
        from: {
          transform: "translateX(100%)",
        },
        to: {
          transform: "translateX(0)",
        },
      },
      "drawer-slide-left": {
        from: {
          transform: "translateX(-100%)",
        },
        to: {
          transform: "translateX(0)",
        },
      },
      "loader-spin": {
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
    animation: {
      "drawer-enter-right": "drawer-slide-right 0.3s",
      "drawer-exit-right": "drawer-slide-right 0.3s reverse",
      "drawer-enter-left": "drawer-slide-left 0.3s",
      "drawer-exit-left": "drawer-slide-left 0.3s reverse",
      "loader-spin": "loader-spin 1s linear infinite",
    },
    fontSize: {
      inherit: "inherit",
    },
    fontFamily: {},
    extend: {
      flex: {
        fill: "1 0 0",
      },
    },
  },
  plugins: [tailwindcssReactAriaComponents],
};

export default baseTailwindConfig;