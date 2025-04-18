import type { Meta, StoryObj } from '@storybook/react';
import SpiceCard from '../src/features/spices/components/SpiceCard';
import { userEvent, within } from '@storybook/test';
import { SpiceProvider } from '../src/contexts/SpiceContext';

/**
 * SpiceCard displays information about a single spice, including
 * its name, price, color, and heat level.
 */
const meta = {
  title: 'Features/Spices/SpiceCard',
  component: SpiceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card component that displays information about a spice including name, price, color, heat level, and optional image.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true }
        ]
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1A1F2C' },
        { name: 'neutral', value: '#f5f5f5' }
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    spice: {
      control: 'object',
      description: 'Spice data object',
    },
  },
  decorators: [
    (Story) => (
      <SpiceProvider>
        <div className="p-4 max-w-xs">
          <Story />
        </div>
      </SpiceProvider>
    ),
  ],
} satisfies Meta<typeof SpiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spice: {
      id: 1,
      name: 'Adobo',
      price: '$3.99',
      color: 'F9A602',
      heat: 2,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard spice card with moderate heat level.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText('Adobo'));
  }
};

export const NoHeat: Story = {
  args: {
    spice: {
      id: 2,
      name: 'Cinnamon',
      price: '$2.49',
      color: '965A3E',
      heat: 0,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Spice with no heat level (0).'
      }
    }
  }
};

export const MildHeat: Story = {
  args: {
    spice: {
      id: 3,
      name: 'Paprika',
      price: '$3.29',
      color: 'E53935',
      heat: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Spice with mild heat level (1).'
      }
    }
  }
};

export const MediumHeat: Story = {
  args: {
    spice: {
      id: 4,
      name: 'Cayenne',
      price: '$3.99',
      color: 'D32F2F',
      heat: 3,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Spice with medium heat level (3).'
      }
    }
  }
};

export const HotSpice: Story = {
  args: {
    spice: {
      id: 5,
      name: 'Ghost Pepper',
      price: '$7.99',
      color: 'B71C1C',
      heat: 5,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Spice with maximum heat level (5).'
      }
    }
  }
};

export const WithImage: Story = {
  args: {
    spice: {
      id: 6,
      name: 'Saffron',
      price: '$19.99',
      color: 'FFB900',
      heat: 0,
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Spice card with an image.'
      }
    }
  }
};

export const LongName: Story = {
  args: {
    spice: {
      id: 7,
      name: 'Super Extremely Long Spice Name That Should Wrap Properly',
      price: '$4.99',
      color: '4CAF50',
      heat: 2,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case with a very long spice name to test text wrapping.'
      }
    }
  }
};

export const ExpensiveSpice: Story = {
  args: {
    spice: {
      id: 8,
      name: 'Exotic Vanilla',
      price: '$29.99',
      color: 'EEEEEE',
      heat: 0,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Premium spice with a high price point.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  args: {
    spice: {
      id: 9,
      name: 'Interactive Spice',
      price: '$5.99',
      color: '6E59A5',
      heat: 2,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the spice card with click events recorded.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate user interactions
    await userEvent.hover(canvas.getByText('Interactive Spice'));
    await userEvent.click(canvas.getByText('Interactive Spice'));
  }
};
