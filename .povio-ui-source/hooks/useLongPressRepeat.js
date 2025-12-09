import { useRef, useEffect } from "react";
const useLongPressRepeat = ({
  onPress,
  enabled = true,
  interval = 85,
  timeout = 500
}) => {
  const intervalRef = useRef(void 0);
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  const onPressStart = () => {
    onPress(false);
    if (!enabled) {
      return;
    }
    intervalRef.current = setTimeout(() => {
      onPress(true);
      intervalRef.current = setInterval(() => {
        onPress(true);
      }, interval);
    }, timeout);
  };
  const onPressEnd = () => {
    clearInterval(intervalRef.current);
  };
  return { onPressStart, onPressEnd };
};
export {
  useLongPressRepeat
};
