import { useState, useEffect } from "react";

const MousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null, px: null, py: null });

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY, px: e.pageX, py: e.pageY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

export default MousePosition;
