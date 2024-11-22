import { useEffect, useRef } from "react";

const usePreventPageScroll = () => {
  const divRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const div = divRef.current;
      const scrollTop = div.scrollTop;
      const scrollHeight = div.scrollHeight;
      const clientHeight = div.clientHeight;

      // Prevent scroll when reaching the top
      if (scrollTop === 0 && e.deltaY < 0) {
        e.preventDefault();
      }

      // Prevent scroll when reaching the bottom
      if (scrollTop + 0.7 + clientHeight >= scrollHeight && e.deltaY > 0) {
        e.preventDefault();
      }
    };

    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  return divRef;
};

export default usePreventPageScroll;
