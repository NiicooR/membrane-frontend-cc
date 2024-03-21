import { useEffect, useRef, useState } from "react";

export const useTimeout = () => {
  const [timeoutEnded, setTimeoutEnded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const setTimer = (seconds: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const timeout = setTimeout(() => {
      setTimeoutEnded(true);
    }, seconds * 1000);
    timeoutRef.current = timeout;
  };

  useEffect(() => {
    if (timeoutEnded) {
      setTimeoutEnded(false);
    }
  }, [timeoutEnded]);

  return {
    setTimer,
    timeoutEnded,
  };
};
