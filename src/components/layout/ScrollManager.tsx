import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const targetId = location.hash ? decodeURIComponent(location.hash.slice(1)) : "";
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        target.scrollIntoView({ block: "start", behavior: "auto" });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.search]);

  return null;
};
