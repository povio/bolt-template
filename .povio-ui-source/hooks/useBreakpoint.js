import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";
function getBreakpoints() {
  const cs = getComputedStyle(document.documentElement);
  const entries = ["sm", "md", "lg", "xl", "2xl"].map((k) => [k, cs.getPropertyValue(`--breakpoint-${k}`).trim()]).filter(([, v]) => !!v);
  return Object.fromEntries(entries);
}
function useBreakpoint(breakpointKey) {
  const breakpoints = useMemo(() => getBreakpoints(), []);
  if (!breakpoints) {
    throw new Error("Tailwind config is missing theme.screens");
  }
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`
  });
  return bool;
}
export {
  useBreakpoint
};
