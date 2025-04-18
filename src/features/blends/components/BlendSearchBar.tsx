
import React from 'react';
import { Search, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface BlendSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}

const BlendSearchBar = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  itemsPerPage,
  onItemsPerPageChange
}: BlendSearchBarProps) => {
  return (
    <Card className="mb-6 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search blends..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10"
            aria-label="Search blends"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2 p-2 border rounded-md">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-transparent border-none focus:outline-none text-sm"
            aria-label="Items per page"
          >
            <option value={9}>9 per page</option>
            <option value={18}>18 per page</option>
            <option value={27}>27 per page</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

export default BlendSearchBar;
