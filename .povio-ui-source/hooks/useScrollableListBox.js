import { useRef, useEffect } from "react";
import { useBreakpoint } from "./useBreakpoint.js";
function useScrollableListBox() {
  const ref = useRef(null);
  const isDesktop = useBreakpoint("md");
  useEffect(() => {
    const node = ref.current;
    if (!node || isDesktop) {
      return void 0;
    }
    const onPointerDownCapture = (e) => {
      e.stopPropagation();
    };
    const onClickCapture = (e) => {
      if (e.currentTarget?.contains(e.target) && e.target !== e.currentTarget) {
        e.target.click();
      }
    };
    node.addEventListener("pointerdown", onPointerDownCapture);
    node.addEventListener("click", onClickCapture);
    return () => {
      node.removeEventListener("pointerdown", onPointerDownCapture);
      node.removeEventListener("click", onClickCapture);
    };
  }, [ref, isDesktop]);
  return { ref };
}
export {
  useScrollableListBox
};
