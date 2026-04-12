import { useEffect, useRef, useCallback } from "react";

interface Options {
  onIntersect: () => void;
  enabled?: boolean;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
}: Options) {
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [handleIntersect, enabled]);

  return ref;
}
