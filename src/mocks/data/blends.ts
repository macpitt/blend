
import type { SpiceBlend } from "../../types"

// Plain blends data
export const spiceBlends: SpiceBlend[] = [
  {
    id: 0,
    name: 'Tasty Blend',
    blends: [],
    spices: [1, 5, 13, 14],
    description: 'This is a new spice blend',
  },
  {
    id: 1,
    name: 'Taco Seasoning',
    blends: [],
    spices: [5, 7, 9, 13],
    description: 'Perfect for taco night',
  },
  {
    id: 2,
    name: 'Curry Mix',
    blends: [],
    spices: [2, 4, 14],
    description: 'A blend of curry spices',
  },
  {
    id: 3,
    name: 'Super Blend',
    blends: [0, 1],
    spices: [13],
    description: 'A blend of blends with Adobo',
  },
  {
    id: 4,
    name: 'Italian Herb Mix',
    blends: [],
    spices: [1, 3, 5],
    description: 'A classic blend featuring Basil and other Mediterranean herbs.'
  },
  {
    id: 5,
    name: 'Indian Spice Blend',
    blends: [],
    spices: [2, 4, 14],
    description: 'A warm, aromatic blend featuring Cardamom and other Indian spices.'
  },
  {
    id: 6,
    name: 'Mexican Seasoning',
    blends: [],
    spices: [4, 7, 13],
    description: 'A unique blend featuring Adobo and other spices for Mexican dishes.'
  },
  {
    id: 7,
    name: 'BBQ Rub',
    blends: [],
    spices: [7, 8, 9, 10],
    description: 'A smoky, spicy blend perfect for grilling and BBQ.'
  },
  {
    id: 8,
    name: 'Herbes de Provence',
    blends: [],
    spices: [1, 3, 5, 12],
    description: 'A traditional French herb mixture featuring Thyme and other herbs.'
  },
  {
    id: 9,
    name: 'Chai Masala',
    blends: [5],
    spices: [2, 6],
    description: 'A warm, spiced blend for making traditional chai tea.'
  },
  {
    id: 10,
    name: 'Ultimate Mix',
    blends: [4, 7],
    spices: [15],
    description: 'A premium spice blend featuring Saffron and other carefully selected blends.'
  }
];
