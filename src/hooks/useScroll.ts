import { useEffect, useState } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const timeDiff = currentTime - lastTime;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      
      const newVelocity = timeDiff > 0 ? scrollDiff / timeDiff : 0;
      setVelocity(newVelocity);
      setLastScrollY(currentScrollY);
      setLastTime(currentTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, lastTime]);

  return velocity;
};
