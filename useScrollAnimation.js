import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visible when entering viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Set invisible when leaving viewport (scrolling up)
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '-50px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [elementRef, isVisible];
};

export default useScrollAnimation;
