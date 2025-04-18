
import { z } from 'zod';

// Spice schema for validation
export const SpiceSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  color: z.string(),
  heat: z.number(),
  image: z.string().optional()
});

// Spice type with Zod validation
export type Spice = z.infer<typeof SpiceSchema>;

// Create a Zod schema for validation
export const SpiceBlendSchema = z.object({
  id: z.number(),
  name: z.string(),
  blends: z.array(z.number()),
  spices: z.array(z.number()),
  description: z.string()
});

// Enhanced type with Zod validation
export type SpiceBlend = z.infer<typeof SpiceBlendSchema>;

// Result type for better error handling
export type Result<T> = {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
};

// Async function return type
export type AsyncResult<T> = Promise<Result<T>>;
