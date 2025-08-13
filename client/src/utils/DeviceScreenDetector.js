import { useEffect, useState } from "react";

const useInteractionType = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsTouch(window.matchMedia('(hover: none)').matches);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return {
    isTouchDevice: isTouch,
    hasHover: !isTouch
  };
};

export default useInteractionType;