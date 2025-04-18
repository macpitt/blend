
import React from 'react';
import { useSpiceContext } from '@/hooks/useSpiceContext';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import BlendSearchBar from '../components/BlendSearchBar';
import BlendGrid from '../components/BlendGrid';
import BlendPagination from '../components/BlendPagination';
import { useBlendSearch } from '../hooks/useBlendSearch';
import { toast } from 'sonner';

const BlendListPage = () => {
  const { blends, loadingBlends, error } = useSpiceContext();
  
  const {
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
  } = useBlendSearch(blends);

  // Show errors as toasts
  React.useEffect(() => {
    if (error) {
      toast.error("Failed to load blends", {
        description: error
      });
    }
  }, [error]);
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-spice-cinnamon mb-6">All Spice Blends</h1>
        
        <BlendSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={clearSearch}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {loadingBlends ? (
          <div className="py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <BlendGrid blends={currentItems} />
            
            {filteredBlends.length > 0 && (
              <BlendPagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                totalItems={filteredBlends.length}
                itemsPerPage={itemsPerPage}
                startItemIndex={indexOfFirstItem}
                endItemIndex={Math.min(indexOfLastItem, filteredBlends.length)}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default BlendListPage;
