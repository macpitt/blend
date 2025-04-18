import { createContext, useContext, useState, useCallback } from 'react';
import { toast } from "sonner";
import { useSpiceData } from '@/hooks/useSpiceData';
import { createSpiceBlend, getAllSpicesInBlend } from '@/services/spiceOperations';
import { Result, SpiceBlend, Spice } from '@/types';

// Context Types
interface SpiceContextType {
  spices: Spice[];
  loadingSpices: boolean;
}

interface BlendsContextType {
  blends: SpiceBlend[];
  loadingBlends: boolean;
  getSpiceById: (id: number) => Spice | undefined;
  getBlendById: (id: number) => SpiceBlend | undefined;
  createBlend: (blend: Omit<SpiceBlend, 'id'>) => Promise<SpiceBlend>;
}

interface ErrorContextType {
  error: string | null;
  refreshData: () => Promise<void>;
}

// Create the contexts
const SpiceContext = createContext<SpiceContextType | undefined>(undefined);
const BlendsContext = createContext<BlendsContextType | undefined>(undefined);
const SpiceErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Provider component
interface SpiceProviderProps {
  children: React.ReactNode;
}

export const SpiceProvider = ({ children }: SpiceProviderProps) => {
  const { spices, blends, error, loadingSpices, loadingBlends, refreshData } = useSpiceData();
  
  // Helper to get a spice by ID
  const getSpiceById = useCallback((id: number) => {
    return spices.find(spice => spice.id === id);
  }, [spices]);
  
  // Helper to get a blend by ID
  const getBlendById = useCallback((id: number) => {
    return blends.find(blend => blend.id === id);
  }, [blends]);
  
  // Modify createBlend method to handle new Result type
  const createBlend = async (blend: Omit<SpiceBlend, 'id'>): Promise<SpiceBlend> => {
    const result = await createSpiceBlend(blend, blends);
    
    if (result.data) {
      await refreshData();
      return result.data;
    } else {
      throw new Error(result.error?.message || "Failed to create blend");
    }
  };
  
  return (
    <SpiceContext.Provider value={{ spices, loadingSpices }}>
      <BlendsContext.Provider value={{ blends, loadingBlends, getSpiceById, getBlendById, createBlend }}>
        <SpiceErrorContext.Provider value={{ error, refreshData }}>
          {children}
        </SpiceErrorContext.Provider>
      </BlendsContext.Provider>
    </SpiceContext.Provider>
  );
};

// Custom hooks for accessing the context
export const useSpice = () => {
  const context = useContext(SpiceContext);
  if (!context) {
    throw new Error('useSpice must be used within a SpiceProvider');
  }
  return context;
};

export const useBlends = () => {
  const context = useContext(BlendsContext);
  if (!context) {
    throw new Error('useBlends must be used within a SpiceProvider');
  }
  return context;
};

export const useSpiceError = () => {
  const context = useContext(SpiceErrorContext);
  if (!context) {
    throw new Error('useSpiceError must be used within a SpiceProvider');
  }
  return context;
};