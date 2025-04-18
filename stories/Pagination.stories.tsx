
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';

/**
 * Pagination component for navigating through multiple pages of content.
 * Supports previous/next buttons, ellipsis for large page counts, and active page highlighting.
 */
const meta = {
  title: 'UI/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive pagination component for navigating through multi-page content.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'aria-roles', enabled: true }
        ]
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/example-pagination-design',
    },
    controls: {
      expanded: true
    }
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes to apply',
      control: 'text'
    }
  }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic pagination with three pages and the first page active.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText('2'));
  }
};

export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pagination with ellipsis for many pages, showing the first few and last page.'
      }
    }
  }
};

export const Disabled: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="pointer-events-none opacity-50" aria-disabled="true" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'First page with disabled previous button.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'aria-allowed-attr', enabled: true }
        ]
      }
    }
  }
};

export const ManyPages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex pagination with many pages showing ellipses for ranges and current page in the middle.'
      }
    }
  }
};

export const CompactMobile: Story = {
  render: () => (
    <div className="max-w-[320px] bg-gray-50 p-4 rounded-md">
      <Pagination>
        <PaginationContent className="flex justify-between">
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <div className="flex items-center">
            <span className="text-sm">Page 3 of 10</span>
          </div>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact mobile-friendly pagination that only shows prev/next and current page info.'
      }
    },
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
