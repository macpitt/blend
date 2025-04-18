
import { useMemo } from 'react';
import { Spice } from '@/types';

interface UseSpiceFilteringProps {
  spices: Spice[];
  searchTerm: string;
  sortBy: 'name' | 'heat';
  sortDirection: 'asc' | 'desc';
}

export const useSpiceFiltering = ({
  spices,
  searchTerm,
  sortBy,
  sortDirection
}: UseSpiceFilteringProps) => {
  // Memoize filtered spices
  const filteredSpices = useMemo(() => {
    return spices.filter(spice =>
      spice.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [spices, searchTerm]);

  // Memoize sorted spices
  const sortedSpices = useMemo(() => {
    return [...filteredSpices].sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === 'asc' 
          ? a.heat - b.heat 
          : b.heat - a.heat;
      }
    });
  }, [filteredSpices, sortBy, sortDirection]);

  return sortedSpices;
};
