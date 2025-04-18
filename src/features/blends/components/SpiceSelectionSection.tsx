import React, { useState, useEffect } from 'react';
import { Spice } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { X, Search, Plus, ChevronDown, ChevronUp, Flame } from "lucide-react";

interface SpiceSelectionSectionProps {
  spices: Spice[];
  selectedSpices: number[];
  onAddSpice: (spiceId: number) => void;
  onRemoveSpice: (spiceId: number) => void;
}

const SpiceSelectionSection = ({
  spices,
  selectedSpices,
  onAddSpice,
  onRemoveSpice
}: SpiceSelectionSectionProps) => {
  const [spiceSearch, setSpiceSearch] = useState('');
  const [showSpiceList, setShowSpiceList] = useState(false);
  const [filteredSpices, setFilteredSpices] = useState<Spice[]>([]);

  useEffect(() => {
    if (!spiceSearch.trim()) {
      setFilteredSpices(spices.slice(0, 50));
      return;
    }
    
    const lowerTerm = spiceSearch.toLowerCase();
    const filtered = spices
      .filter(spice => spice.name.toLowerCase().includes(lowerTerm))
      .slice(0, 50);
    
    setFilteredSpices(filtered);
    
    if (spiceSearch.trim()) {
      setShowSpiceList(true);
    }
  }, [spiceSearch, spices]);

  const handleAddSpice = (spiceId: number) => {
    if (!selectedSpices.includes(spiceId)) {
      onAddSpice(spiceId);
      setSpiceSearch('');
      setFilteredSpices(spices.slice(0, 50));
      setShowSpiceList(false);
    }
  };

  const handleSpiceSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpiceSearch(e.target.value);
  };

  const renderHeatLevel = (heat: number) => {
    if (heat === 0) return <span className="text-sm text-gray-500">None</span>;
    
    return (
      <div className="flex">
        {Array(heat).fill(0).map((_, idx) => (
          <Flame 
            key={`heat-${idx}`} 
            className="text-red-500" 
            size={16} 
            fill="currentColor"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Select Spices</h2>
      
      <div className="flex flex-col space-y-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search spices..."
            value={spiceSearch}
            onChange={handleSpiceSearchChange}
            className="pl-9"
            autoComplete="off"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        {!spiceSearch && (
          <div className="flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setShowSpiceList(!showSpiceList)}
              className="text-sm w-full flex justify-between"
            >
              <span>{showSpiceList ? 'Hide Spice List' : 'Browse Available Spices'}</span>
              {showSpiceList ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        )}
        
        {(showSpiceList || spiceSearch) && (
          <div className="border rounded-md p-2 overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Heat</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-16">Add</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSpices.map(spice => (
                    <TableRow key={`spice-list-${spice.id}`}>
                      <TableCell>{spice.name}</TableCell>
                      <TableCell>{renderHeatLevel(spice.heat)}</TableCell>
                      <TableCell>{spice.price}</TableCell>
                      <TableCell>
                        {selectedSpices.includes(spice.id) ? (
                          <span className="text-xs text-muted-foreground">Added</span>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleAddSpice(spice.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!spiceSearch && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Showing first 50 of {spices.length} spices. Use search for more options.
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[60px]">
          {selectedSpices.map(id => {
            const spice = spices.find(s => s.id === id);
            return (
              <Badge 
                key={`selected-spice-${id}`}
                variant="secondary"
                className="px-3 py-1 flex items-center gap-1"
              >
                {spice?.name || `Spice #${id}`}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => onRemoveSpice(id)}
                />
              </Badge>
            );
          })}
          {selectedSpices.length === 0 && (
            <p className="text-sm text-muted-foreground">No spices selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpiceSelectionSection;
