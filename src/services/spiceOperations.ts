import { api } from '@/services/api';
import { Spice, SpiceBlend, Result, AsyncResult, SpiceBlendSchema } from '@/types';

export async function createSpiceBlend(
  blend: Omit<SpiceBlend, 'id'>, 
  currentBlends: SpiceBlend[]
): AsyncResult<SpiceBlend> {
  try {
    // Validate input using Zod and create a clean object
    const validatedBlend = SpiceBlendSchema.partial().parse({
      name: blend.name,
      description: blend.description,
      spices: blend.spices,
      blends: blend.blends
    });
    
    // Attempt API creation with the clean object
    const newBlend = await api.createBlend(validatedBlend);
    
    return { 
      data: newBlend 
    };
  } catch (error) {
    // Comprehensive error handling
    console.error('Blend creation failed:', error);
    
    return { 
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof Error ? 'BLEND_CREATION_FAILED' : 'UNKNOWN_ERROR'
      }
    };
  }
}

// Similar pattern for other async operations
export async function getAllSpicesInBlend(
  blendId: number, 
  getSpiceById: (id: number) => Spice | undefined,
  getBlendById: (id: number) => SpiceBlend | undefined
): AsyncResult<Spice[]> {
  try {
    const spices = await api.getAllSpicesInBlend(blendId);
    return { data: spices };
  } catch (error) {
    console.error(`Failed to fetch spices for blend ${blendId}:`, error);
    return { 
      error: {
        message: 'Could not fetch spices',
        code: 'SPICES_FETCH_FAILED'
      }
    };
  }
}