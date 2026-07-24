import Lottie from 'lottie-react';
import { useRef, useEffect } from 'react';

interface AnimatedIconProps {
  animationData: unknown;
  loop?: boolean;
  hover?: boolean;
  size?: number | string;
  className?: string;
  onClick?: () => void;
  isToggled?: boolean;
  invertColors?: boolean;
  speed?: number;
}

export const AnimatedIcon = ({ 
  animationData, 
  loop = false, 
  hover = false,
  isToggled,
  invertColors = false,
  speed = 1,
  size = 24, 
  className = "",
  onClick
}: AnimatedIconProps) => {
  const lottieRef = useRef<any>(null);

  // Set playback speed
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  // Handle explicit toggle state changes
  useEffect(() => {
    if (isToggled !== undefined && lottieRef.current) {
      lottieRef.current.setDirection(isToggled ? 1 : -1);
      lottieRef.current.play();
    }
  }, [isToggled]);

  const handleMouseEnter = () => {
    if (hover && isToggled === undefined && lottieRef.current) {
      lottieRef.current.setDirection(1);
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (hover && isToggled === undefined && lottieRef.current) {
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
    }
  };

  return (
    <div 
      className={`animated-icon-wrapper ${className}`}
      style={{ 
        width: size, 
        height: size, 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        cursor: onClick || hover ? 'pointer' : 'default',
        filter: invertColors ? 'invert(1) brightness(2)' : 'none'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Lottie 
        lottieRef={lottieRef}
        animationData={animationData} 
        loop={loop}
        autoplay={isToggled !== undefined ? false : (loop || !hover)} 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
