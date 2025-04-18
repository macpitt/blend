
import { useState, useEffect, useCallback, useMemo } from 'react';
import { SpiceBlend } from '@/types';

/**
 * Custom hook for blend searching and pagination
 * 
 * @param blends - Array of spice blends to search through
 * @returns Object with search state and methods
 */
export const useBlendSearch = (blends: SpiceBlend[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  
  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  // Filter blends based on search term using memoization
  const filteredBlends = useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    return blends.filter(blend =>
      blend.name.toLowerCase().includes(normalizedSearchTerm) ||
      blend.description.toLowerCase().includes(normalizedSearchTerm)
    );
  }, [blends, searchTerm]);
  
  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Get current items for display
  const currentItems = useMemo(() => {
    return filteredBlends.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredBlends, indexOfFirstItem, indexOfLastItem]);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredBlends.length / itemsPerPage));
  
  // Ensure current page is within bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);
  
  // Change page
  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);
  
  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setCurrentPage(1);
  }, []);
  
  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    filteredBlends,
    currentItems,
    totalPages,
    paginate,
    clearSearch,
    indexOfFirstItem,
    indexOfLastItem
  };
};
