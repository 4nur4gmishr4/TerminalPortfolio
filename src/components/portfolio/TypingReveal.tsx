import { useEffect, useState } from "react";

interface TypingRevealProps {
  text: string;
  delay?: number;
  speed?: number;
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const TypingReveal = ({ text, delay = 180, speed = 24 }: TypingRevealProps) => {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisibleLength(text.length);
      return;
    }

    setVisibleLength(0);
    let timeoutId: number;

    const typeNext = (currentLength: number) => {
      if (currentLength < text.length) {
        setVisibleLength(currentLength + 1);
        timeoutId = window.setTimeout(() => typeNext(currentLength + 1), speed);
      }
    };

    timeoutId = window.setTimeout(() => typeNext(0), delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, speed, text]);

  return (
    <span className="typing-reveal" aria-hidden="true">
      {text.slice(0, visibleLength)}
      {visibleLength < text.length && <span className="typing-reveal__cursor" />}
    </span>
  );
};
