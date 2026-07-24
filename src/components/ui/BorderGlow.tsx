import React, { useRef, useState, useEffect } from 'react';
import './BorderGlow.css';

export const BorderGlow = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 820);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    let animationFrameId: number;
    const animate = () => {
      setAngle((prev) => (prev + 1.5) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`border-glow-wrapper ${className}`}
      style={{
        '--angle': `${angle}deg`
      } as React.CSSProperties}
    >
      <div className="border-glow-border" />
      <div className="border-glow-content">
        {children}
      </div>
    </div>
  );
};
