import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Intro = ({ onComplete }) => {
  const eleRefs = useRef([]);
  const anaRefs = useRef([]);
  const vRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete(); // notify parent when done
      },
    });

    // Initial state for letters
    gsap.set([...eleRefs.current, ...anaRefs.current], {
      y: 90,
      opacity: 0,
    });
    gsap.set(vRef.current, { opacity: 1 }); // v always visible

    // Animate "Ele"
    tl.to(eleRefs.current, {
      y: 0,
      opacity: 1,
      stagger: -0.2,
      ease: 'power2.out',
      duration: 0.9,
      delay: 1,
    }, 0);

    // Animate "ana"
    tl.to(anaRefs.current, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      ease: 'power2.out',
      duration: 0.9,
      delay: 1,
    }, 0);

    // After text animation completes, slide intro up
    tl.to(containerRef.current, {
      y: "-100%",
      duration: 1,
      ease: 'power2.inOut',
      delay: 0.5,
    });

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-dark-green text-background-green flex items-center justify-center font-plaster fixed top-0 left-0 z-50"
      style={{ overflow: 'hidden' }}
    >
      <h1 className="text-[40px] lg:text-[70px] xl:text-[100px] font-bold flex gap-0 tracking-wide overflow-hidden leading-none">
        {/* Left side: "Ele" */}
        <span ref={(el) => (eleRefs.current[0] = el)}>E</span>
        <span ref={(el) => (eleRefs.current[1] = el)}>l</span>
        <span ref={(el) => (eleRefs.current[2] = el)}>e</span>

        {/* Center: "v" */}
        <span ref={vRef}>v</span>

        {/* Right side: "ana" */}
        <span ref={(el) => (anaRefs.current[0] = el)}>a</span>
        <span ref={(el) => (anaRefs.current[1] = el)}>n</span>
        <span ref={(el) => (anaRefs.current[2] = el)}>a</span>
      </h1>
    </div>
  );
};

export default Intro;
