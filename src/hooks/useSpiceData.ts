
import { useState, useEffect, useCallback, useRef } from 'react';
import { Spice, SpiceBlend } from '@/types';
import { api } from '@/services/api';
import { toast } from "sonner";
import { spices as fallbackSpices, spiceBlends as fallbackBlends } from '@/mocks/data';

interface SpiceDataState {
  spices: Spice[];
  blends: SpiceBlend[];
  loadingSpices: boolean;
  loadingBlends: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching and managing spice data
 */
export function useSpiceData() {
  const [state, setState] = useState<SpiceDataState>({
    spices: [],
    blends: [],
    loadingSpices: true,
    loadingBlends: true,
    error: null
  });
  
  const [hasShownFallbackToast, setHasShownFallbackToast] = useState(false);
  const initialFetchCompleted = useRef(false);

  // Debug function to show current state
  const logState = useCallback(() => {
    console.log('SpiceData STATE:', { 
      spicesCount: state.spices.length,
      blendsCount: state.blends.length,
      loadingSpices: state.loadingSpices,
      loadingBlends: state.loadingBlends,
      error: state.error
    });
  }, [state]);

  /**
   * Handles fallback data when API fails
   */
  const handleFallbackData = useCallback((
    fallbackData: any[] | undefined,
    dataType: 'spices' | 'blends'
  ) => {
    console.log(`SpiceData: Using fallback ${dataType} data, count:`, fallbackData?.length);
    
    // Only show fallback toast once per session
    if (!hasShownFallbackToast) {
      toast.error(`Using fallback ${dataType} data.`, {
        description: "API connection unavailable"
      });
      setHasShownFallbackToast(true);
    }
    
    // Verify fallback data is available and valid
    if (!fallbackData || !Array.isArray(fallbackData) || fallbackData.length === 0) {
      console.error(`Fallback ${dataType} data is invalid:`, fallbackData);
      setState(prev => ({ 
        ...prev, 
        error: `Failed to load ${dataType} data. Please refresh the page.`,
        [dataType]: []
      }));
    } else {
      setState(prev => ({ ...prev, [dataType]: fallbackData }));
    }
  }, [hasShownFallbackToast]);

  /**
   * Fetches spices with fallback to mock data
   */
  const fetchSpices = useCallback(async () => {
    try {
      console.log('SpiceData: Attempting to load spices from API...');
      const spicesData = await api.getAllSpices();
      console.log('SpiceData: Spices loaded from API successfully:', spicesData.length);
      setState(prev => ({ ...prev, spices: spicesData }));
      if (initialFetchCompleted.current) {
        toast.success("Spice data loaded!");
      }
      setHasShownFallbackToast(false);
    } catch (spiceErr) {
      console.error('Failed to load spices from API, using fallback data:', spiceErr);
      handleFallbackData(fallbackSpices, 'spices');
    }
  }, [handleFallbackData]);

  /**
   * Fetches blends with fallback to mock data
   */
  const fetchBlends = useCallback(async () => {
    try {
      console.log('SpiceData: Attempting to load blends from API...');
      const blendsData = await api.getAllBlends();
      console.log('SpiceData: Blends loaded from API successfully:', blendsData.length);
      setState(prev => ({ ...prev, blends: blendsData }));
    } catch (blendErr) {
      console.error('Failed to load blends from API, using fallback data:', blendErr);
      handleFallbackData(fallbackBlends, 'blends');
    }
  }, [handleFallbackData]);

  /**
   * Fetches spice data from API with fallbacks
   */
  const fetchData = useCallback(async () => {
    // Prevent multiple fetches for the initial data load
    if (initialFetchCompleted.current) {
      console.log('SpiceData: Skipping redundant fetch, use refreshData() to force reload');
      return;
    }
    
    try {
      setState(prev => ({
        ...prev,
        loadingSpices: true,
        loadingBlends: true,
        error: null
      }));
      
      console.log('SpiceData: Fetching data...');
      // Only show toast on manual refresh, not on initial load
      if (initialFetchCompleted.current) {
        toast.info("Loading spice data...");
      }
      
      // Fetch spices with fallback
      await fetchSpices();
      
      // Fetch blends with fallback
      await fetchBlends();
      
      // Mark initial fetch as completed
      initialFetchCompleted.current = true;
      
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setState(prev => ({
        ...prev, 
        error: 'Failed to load data. Please refresh and try again.',
        spices: fallbackSpices || [],
        blends: fallbackBlends || []
      }));
    } finally {
      setState(prev => ({
        ...prev,
        loadingSpices: false,
        loadingBlends: false
      }));
      logState();
    }
  }, [fetchSpices, fetchBlends, logState]);

  /**
   * Force refresh data
   */
  const refreshData = useCallback(async () => {
    console.log('SpiceData: Manual refresh triggered');
    toast.info("Refreshing spice data...");
    
    try {
      setState(prev => ({
        ...prev,
        loadingSpices: true,
        loadingBlends: true,
        error: null
      }));
      
      // Fetch spices with fallback
      await fetchSpices();
      
      // Fetch blends with fallback
      await fetchBlends();
      
      toast.success("Data refreshed successfully!");
    } catch (err) {
      console.error('Failed to refresh data:', err);
      setState(prev => ({
        ...prev, 
        error: 'Failed to refresh data. Please try again.',
      }));
      toast.error("Failed to refresh data");
    } finally {
      setState(prev => ({
        ...prev,
        loadingSpices: false,
        loadingBlends: false
      }));
      logState();
    }
  }, [fetchSpices, fetchBlends, logState]);

  // Only fetch data once on initial mount
  useEffect(() => {
    console.log('SpiceData: Initial data fetch triggered');
    if (!initialFetchCompleted.current) {
      fetchData();
    }
    // We intentionally don't include fetchData in the dependency array
    // to prevent multiple fetches on re-renders
  }, []); 

  useEffect(() => {
    logState();
  }, [state.spices, state.blends, state.loadingSpices, state.loadingBlends, state.error, logState]);

  return {
    ...state,
    refreshData
  };
}
