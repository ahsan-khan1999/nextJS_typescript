import { useState, useEffect } from "react";
export const useSyncState = function (initialValue) {
  const [value, updateValue] = useState(initialValue);

  let current = value;

  const get = () => current;

  const set = (newValue) => {
    current = newValue;
    updateValue(newValue);
    return current;
  };

  return {
    get,
    set,
  };
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
