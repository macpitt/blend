
import { useState, useEffect } from 'react';
import { SpiceBlend } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { X, Search, Plus, ChevronDown, ChevronUp } from "lucide-react";

interface BlendSelectionSectionProps {
  blends: SpiceBlend[];
  selectedBlends: number[];
  onAddBlend: (blendId: number) => void;
  onRemoveBlend: (blendId: number) => void;
}

const BlendSelectionSection = ({
  blends,
  selectedBlends,
  onAddBlend,
  onRemoveBlend
}: BlendSelectionSectionProps) => {
  const [blendSearch, setBlendSearch] = useState('');
  const [showBlendList, setShowBlendList] = useState(false);
  const [filteredBlends, setFilteredBlends] = useState<SpiceBlend[]>([]);

  useEffect(() => {
    if (!blendSearch.trim()) {
      setFilteredBlends(blends.slice(0, 30));
      return;
    }
    
    const lowerTerm = blendSearch.toLowerCase();
    const filtered = blends
      .filter(blend => blend.name.toLowerCase().includes(lowerTerm))
      .slice(0, 30);
    
    setFilteredBlends(filtered);
    
    if (blendSearch.trim()) {
      setShowBlendList(true);
    }
  }, [blendSearch, blends]);

  const handleAddBlend = (blendId: number) => {
    if (!selectedBlends.includes(blendId)) {
      onAddBlend(blendId);
      setBlendSearch('');
      setFilteredBlends(blends.slice(0, 30));
      setShowBlendList(false);
    }
  };

  const handleBlendSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlendSearch(e.target.value);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Include Existing Blends</h2>
      
      <div className="flex flex-col space-y-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search blends..."
            value={blendSearch}
            onChange={handleBlendSearchChange}
            className="pl-9"
            autoComplete="off"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        {!blendSearch && (
          <div className="flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setShowBlendList(!showBlendList)}
              className="text-sm w-full flex justify-between"
            >
              <span>{showBlendList ? 'Hide Blend List' : 'Browse Available Blends'}</span>
              {showBlendList ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        )}
        
        {(showBlendList || blendSearch) && (
          <div className="border rounded-md p-2 overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-16">Add</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlends.map(blend => (
                    <TableRow key={`blend-list-${blend.id}`}>
                      <TableCell className="max-w-xs truncate">{blend.name}</TableCell>
                      <TableCell>
                        {selectedBlends.includes(blend.id) ? (
                          <span className="text-xs text-muted-foreground">Added</span>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleAddBlend(blend.id)}
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
              {!blendSearch && blends.length > 30 && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Showing first 30 of {blends.length} blends. Use search for more options.
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[60px]">
          {selectedBlends.map(id => {
            const blend = blends.find(b => b.id === id);
            return (
              <Badge 
                key={`selected-blend-${id}`}
                variant="secondary"
                className="px-3 py-1 flex items-center gap-1"
              >
                {blend?.name || `Blend #${id}`}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => onRemoveBlend(id)}
                />
              </Badge>
            );
          })}
          {selectedBlends.length === 0 && (
            <p className="text-sm text-muted-foreground">No blends selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlendSelectionSection;
