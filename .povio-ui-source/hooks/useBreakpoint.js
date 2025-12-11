import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";
let breakpoints = null;
function getBreakpoints() {
  if (breakpoints) {
    return breakpoints;
  }
  const cs = getComputedStyle(document.documentElement);
  const entries = ["sm", "md", "lg", "xl", "2xl"].map((k) => [k, cs.getPropertyValue(`--breakpoint-${k}`).trim()]).filter(([, v]) => !!v);
  breakpoints = Object.fromEntries(entries);
  return breakpoints;
}
function useBreakpoint(breakpointKey) {
  const breakpoints2 = useMemo(() => getBreakpoints(), []);
  if (!breakpoints2) {
    throw new Error("Tailwind config is missing theme.screens");
  }
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints2[breakpointKey]})`
  });
  return bool;
}
export {
  useBreakpoint
};
