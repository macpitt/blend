import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSpiceFiltering } from '@/features/spices/hooks/useSpiceFiltering';
import type { Spice } from '@/types';

describe('useSpiceFiltering', () => {
  const mockSpices: Spice[] = [
    { id: 1, name: 'Paprika', price: '$2.99', color: 'red', heat: 2 },
    { id: 2, name: 'Cinnamon', price: '$3.99', color: 'brown', heat: 1 },
    { id: 3, name: 'Black Pepper', price: '$1.99', color: 'black', heat: 3 }
  ];

  it('filters spices by search term', () => {
    const { result } = renderHook(() => useSpiceFiltering({
      spices: mockSpices,
      searchTerm: 'pap',
      sortBy: 'name',
      sortDirection: 'asc'
    }));

    expect(result.current).toHaveLength(1);
    expect(result.current[0]?.name).toBe('Paprika');
  });

  it('sorts spices by name ascending', () => {
    const { result } = renderHook(() => useSpiceFiltering({
      spices: mockSpices,
      searchTerm: '',
      sortBy: 'name',
      sortDirection: 'asc'
    }));

    expect(result.current[0]?.name).toBe('Black Pepper');
    expect(result.current[1]?.name).toBe('Cinnamon');
    expect(result.current[2]?.name).toBe('Paprika');
  });

  it('sorts spices by heat descending', () => {
    const { result } = renderHook(() => useSpiceFiltering({
      spices: mockSpices,
      searchTerm: '',
      sortBy: 'heat',
      sortDirection: 'desc'
    }));

    expect(result.current[0]?.heat).toBe(3);
    expect(result.current[1]?.heat).toBe(2);
    expect(result.current[2]?.heat).toBe(1);
  });

  it('handles empty search term', () => {
    const { result } = renderHook(() => useSpiceFiltering({
      spices: mockSpices,
      searchTerm: '',
      sortBy: 'name',
      sortDirection: 'asc'
    }));

    expect(result.current).toHaveLength(3);
  });

  it('handles no matches', () => {
    const { result } = renderHook(() => useSpiceFiltering({
      spices: mockSpices,
      searchTerm: 'xyz',
      sortBy: 'name',
      sortDirection: 'asc'
    }));

    expect(result.current).toHaveLength(0);
  });
});