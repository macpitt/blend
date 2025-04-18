
import type { Meta, StoryObj } from '@storybook/react';
import BlendCard from '../src/features/blends/components/BlendCard';
import { BrowserRouter } from 'react-router-dom';
import { SpiceProvider } from '../src/contexts/SpiceContext';

/**
 * The BlendCard component displays details about a spice blend, including its name,
 * description, and the spices/other blends it contains.
 * 
 * It can be displayed in expanded or collapsed modes, and has a link to view more details
 * when not expanded.
 */
const meta = {
  title: 'Features/Blends/BlendCard',
  component: BlendCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a card with information about a spice blend, including name, description, and ingredients.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'link-name', enabled: true }
        ]
      }
    }
  },
  decorators: [
    (Story) => (
      <SpiceProvider>
        <BrowserRouter>
          <div className="w-[400px] p-4 border border-gray-200 rounded-md bg-white">
            <Story />
          </div>
        </BrowserRouter>
      </SpiceProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether to show all details or a condensed view',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    blend: {
      description: 'The blend data object',
      control: 'object'
    }
  }
} satisfies Meta<typeof BlendCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blend: {
      id: 0,
      name: 'Tasty Blend',
      blends: [],
      spices: [1, 5, 35, 52],
      description: 'This is a new spice blend',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default view of the BlendCard with just spices and no nested blends.'
      }
    }
  }
};

export const WithNestedBlends: Story = {
  args: {
    blend: {
      id: 3,
      name: 'Super Blend',
      blends: [0, 1],
      spices: [0],
      description: 'A blend of blends with Adobo',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the card displays when it includes other blend references.'
      }
    }
  }
};

export const Expanded: Story = {
  args: {
    blend: {
      id: 1,
      name: 'Taco Seasoning',
      blends: [],
      spices: [5, 18, 22, 27],
      description: 'Perfect for taco night',
    },
    expanded: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'The expanded view shows all details and hides the "View Details" link.'
      }
    }
  }
};

export const NoSpicesOrBlends: Story = {
  args: {
    blend: {
      id: 4,
      name: 'Empty Blend',
      blends: [],
      spices: [],
      description: 'A blend with no ingredients yet',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case showing how the card appears when no ingredients are added.'
      }
    }
  }
};
