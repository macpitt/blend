import { useState, useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
  const matches = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  return matches;
}