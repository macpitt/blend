import { z } from 'zod';

export const blendFormSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Name can only contain letters, numbers, spaces, and hyphens'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  spices: z.array(z.number())
    .min(1, 'Select at least one spice'),
  blends: z.array(z.number())
    .optional()
    .default([])
});

export type BlendFormValues = z.infer<typeof blendFormSchema>;

export const blendValidationRules = {
  name: {
    required: 'Blend name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters'
    },
    maxLength: {
      value: 50,
      message: 'Name must be less than 50 characters'
    },
    pattern: {
      value: /^[a-zA-Z0-9\s-]+$/,
      message: 'Name can only contain letters, numbers, spaces, and hyphens'
    }
  },
  description: {
    required: 'Description is required',
    minLength: {
      value: 10,
      message: 'Description must be at least 10 characters'
    },
    maxLength: {
      value: 500,
      message: 'Description must be less than 500 characters'
    }
  }
};