import { useState, useEffect } from "react";
const useIntersectionObserver = ({
  onIntersection,
  root,
  rootMargin,
  threshold
}) => {
  const [ref, setRef] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onIntersection?.();
        }
      },
      { root, rootMargin, threshold }
    );
    if (ref) {
      observer.observe(ref);
    }
    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold, onIntersection]);
  return { setRef };
};
export {
  useIntersectionObserver
};
