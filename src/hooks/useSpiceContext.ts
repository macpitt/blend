
import { useSpice, useBlends, useSpiceError } from '@/contexts/SpiceContext';

/**
 * Combined context hook that preserves backward compatibility
 * with components using the original unified context API
 * 
 * @returns Combined context values from all spice-related contexts
 */
export function useSpiceContext() {
  const spiceContext = useSpice();
  const blendContext = useBlends();
  const errorContext = useSpiceError();
  
  return {
    // From spice context
    ...spiceContext,
    
    // From blend context
    ...blendContext,
    
    // From error context
    ...errorContext
  };
}
