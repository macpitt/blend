import { Spice, SpiceBlend } from '@/types';

// Base API URL - ensure we're using the correct protocol and path
const API_URL = `${window.location.origin}/api`;

/**
 * API client for spice-related operations
 */
export const api = {
  /**
   * Fetches all spices from the API
   */
  getAllSpices: async (): Promise<Spice[]> => {
    console.log('Fetching all spices from API');
    return fetchWithErrorHandling<Spice[]>(`${API_URL}/spices`);
  },
  
  /**
   * Fetches a specific spice by ID
   */
  getSpiceById: async (id: number): Promise<Spice | undefined> => {
    console.log('Fetching spice by ID:', id);
    try {
      return await fetchWithErrorHandling<Spice>(`${API_URL}/spices/${id}`);
    } catch (error) {
      if ((error as Response)?.status === 404) {
        return undefined;
      }
      throw error;
    }
  },
  
  /**
   * Fetches all spice blends
   */
  getAllBlends: async (): Promise<SpiceBlend[]> => {
    console.log('Fetching all blends from API');
    return fetchWithErrorHandling<SpiceBlend[]>(`${API_URL}/blends`);
  },
  
  /**
   * Fetches a specific blend by ID
   */
  getBlendById: async (id: number): Promise<SpiceBlend | undefined> => {
    console.log('Fetching blend by ID:', id);
    try {
      return await fetchWithErrorHandling<SpiceBlend>(`${API_URL}/blends/${id}`);
    } catch (error) {
      if ((error as Response)?.status === 404) {
        return undefined;
      }
      throw error;
    }
  },
  
  /**
   * Creates a new spice blend
   */
  createBlend: async (blend: Omit<SpiceBlend, 'id'>): Promise<SpiceBlend> => {
    console.log('Creating new blend:', blend);
    return fetchWithErrorHandling<SpiceBlend>(`${API_URL}/blends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blend),
    });
  },

  /**
   * Fetches all spices in a specific blend
   */
  getAllSpicesInBlend: async (blendId: number): Promise<Spice[]> => {
    console.log('Fetching all spices in blend:', blendId);
    return fetchWithErrorHandling<Spice[]>(`${API_URL}/blends/${blendId}/spices`);
  }
};

/**
 * Helper function for fetch with proper error handling and typing
 */
async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} ${response.statusText}`, url);
      console.error('Error response:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}