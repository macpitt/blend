import { useEffect, useRef, type ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface VirtualizedProps {
  children: ReactNode;
  onIntersect?: () => void;
}

export function Virtualized({ children, onIntersect }: VirtualizedProps): JSX.Element {
  const hasIntersected = useRef(false);
  const [ref, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && !hasIntersected.current && onIntersect) {
      hasIntersected.current = true;
      onIntersect();
    }
  }, [isIntersecting, onIntersect]);

  return (
    <div ref={ref} className="min-h-[100px]">
      {children}
    </div>
  );
}