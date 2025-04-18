import { memo } from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10'
} as const;

const LoadingSpinner = memo(function LoadingSpinner({ 
  size = 'md', 
  className 
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div 
        className={cn(
          sizeClasses[size],
          'border-4 border-spice-vanilla border-t-spice-cinnamon rounded-full animate-spin',
          className
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
});

export default LoadingSpinner;