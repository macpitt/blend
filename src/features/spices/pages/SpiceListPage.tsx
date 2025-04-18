import { useState, useCallback, useMemo } from 'react';
import { useSpiceContext } from '@/hooks/useSpiceContext';
import Layout from '@/components/Layout';
import SpiceCard from '@/features/spices/components/SpiceCard';
import { SpiceCardSkeleton } from '@/features/spices/components/SpiceCardSkeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import SpiceListControls from '@/features/spices/components/SpiceListControls';
import { useSpiceFiltering } from '@/features/spices/hooks/useSpiceFiltering';
import { useDebounce } from '@/hooks/useDebounce';
import { Virtualized } from '@/components/Virtualized';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';

const SpiceListPage = (): JSX.Element => {
  const { spices, loadingSpices, error } = useSpiceContext();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState<'name' | 'heat'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Use the optimized filtering hook with debounced search
  const sortedSpices = useSpiceFiltering({
    spices,
    searchTerm: debouncedSearch,
    sortBy,
    sortDirection
  });

  // Memoized pagination calculations
  const {
    currentItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem
  } = useMemo(() => {
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    
    return {
      currentItems: sortedSpices.slice(firstItem, lastItem),
      totalPages: Math.ceil(sortedSpices.length / itemsPerPage),
      indexOfFirstItem: firstItem,
      indexOfLastItem: Math.min(lastItem, sortedSpices.length)
    };
  }, [sortedSpices, currentPage, itemsPerPage]);

  // Handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((by: 'name' | 'heat') => {
    setSortBy(prev => {
      if (prev === by) {
        setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
        return prev;
      }
      setSortDirection('asc');
      return by;
    });
  }, []);

  // Loading state
  if (loadingSpices) {
    return (
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(12).fill(null).map((_, i) => (
            <SpiceCardSkeleton key={i} />
          ))}
        </div>
      </Layout>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const items = [];
    
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => paginate(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue;
      
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => paginate(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => paginate(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-spice-cinnamon mb-6">All Spices</h1>
        
        <SpiceListControls
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          sortDirection={sortDirection}
        />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        <ScrollArea className="h-[calc(100vh-350px)] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map(spice => (
              <Virtualized key={spice.id}>
                <SpiceCard spice={spice} />
              </Virtualized>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4 text-center">
            Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {sortedSpices.length} spices
          </p>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default SpiceListPage;