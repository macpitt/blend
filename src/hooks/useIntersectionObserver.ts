import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useIntersectionObserver<T extends Element>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
}: UseIntersectionObserverProps = {}): [RefObject<T>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  return [ref, isIntersecting];
}