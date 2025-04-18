
import React from 'react';
import { Search, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface SpiceListControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  sortBy: 'name' | 'heat';
  onSortChange: (by: 'name' | 'heat') => void;
  sortDirection: 'asc' | 'desc';
}

const SpiceListControls = React.memo(({
  searchTerm,
  onSearchChange,
  itemsPerPage,
  onItemsPerPageChange,
  sortBy,
  onSortChange,
  sortDirection
}: SpiceListControlsProps) => {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <Card className="mb-6 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search spices..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10"
            aria-label="Search spices"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="bg-transparent border-none focus:outline-none text-sm"
              aria-label="Items per page"
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
            </select>
          </div>
          
          <button 
            onClick={() => onSortChange('name')}
            className={`px-3 py-2 text-sm border rounded-md ${
              sortBy === 'name' ? 'bg-spice-vanilla border-spice-cinnamon' : 'bg-white'
            }`}
            aria-label="Sort by name"
          >
            Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          
          <button 
            onClick={() => onSortChange('heat')}
            className={`px-3 py-2 text-sm border rounded-md ${
              sortBy === 'heat' ? 'bg-spice-vanilla border-spice-cinnamon' : 'bg-white'
            }`}
            aria-label="Sort by heat level"
          >
            Heat {sortBy === 'heat' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
    </Card>
  );
});

SpiceListControls.displayName = 'SpiceListControls';

export default SpiceListControls;
