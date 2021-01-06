import { useState, useEffect } from "react";

export const hasWindow = typeof window !== "undefined";

function getWindowDimensions() {
  if (!hasWindow) return [null, null];
  const { innerWidth: width, innerHeight: height } = window;
  let breakpoint;
  if (width <= 672) breakpoint = "sm";
  else if (width >= 672 && width < 1056) breakpoint = "md";
  else if (width >= 1056 && width < 1312) breakpoint = "lg";
  else if (width >= 1312 && width < 1584) breakpoint = "xl";
  else if (width > 1584) breakpoint = "max";
  return {
    width,
    height,
    breakpoint,
  };
}

const withWindowDimensions = (Component) => (props) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (hasWindow) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return <Component {...props} windowDimensions={windowDimensions} />;
};

export default withWindowDimensions;
