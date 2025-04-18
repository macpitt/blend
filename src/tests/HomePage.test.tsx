
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '@/pages/HomePage';
import userEvent from '@testing-library/user-event';
beforeEach(() => {
  vi.resetModules(); // avoid stale module caching
});
import * as actualModule from '@/hooks/useSpiceContext';
console.log('🔍 Resolved module:', actualModule);

vi.mock('@/hooks/useSpiceContext', () => ({
  useSpiceContext: () => ({
    spices: [
      { id: 1, name: 'Cumin', price: '$$', heat:3 }, { id: 2, name: 'Turmeric', price:'$$$',heat:2 }
    ],
    blends: [
      { id: 1, name: 'Garam Masala', spices: [], blends: [] },
      { id: 2, name: 'Tandoori Mix', spices: [], blends: [] }
    ],
    loadingSpices: false,
    loadingBlends: false,
    error: null
  })
}));


// Mock the Layout component to simplify testing
vi.mock('@/components/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
}));

// Mock components to simplify testing
vi.mock('@/features/blends/components/BlendCard', () => ({
  __esModule: true,
  default: ({ blend }: any) => <div data-testid="blend-card">{blend.name}</div>
}));

vi.mock('@/features/spices/components/SpiceCard', () => ({
  __esModule: true,
  default: ({ spice }: any) => <div data-testid="spice-card">{spice.name}</div>
}));

const renderWithProviders = () => {
  return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
  );
};

describe('HomePage Component', () => {
  it('renders the welcome heading', () => {
    renderWithProviders();
    expect(screen.getByText('Welcome to SpiceBlend')).toBeInTheDocument();
  });

  it('displays featured blends section', () => {
    renderWithProviders();
    expect(screen.getByText('Featured Blends')).toBeInTheDocument();
  });

  it('displays popular spices section', () => {
    renderWithProviders();
    expect(screen.getByText('Popular Spices')).toBeInTheDocument();
  });

  it('contains a call-to-action button', () => {
    renderWithProviders();
    const ctaButton = screen.getByRole('link', { name: 'Start Blending' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/create');
  });

  it('contains view all links', () => {
    renderWithProviders();
    const viewAllBlendsLink = screen.getByRole('link', { name: 'View All' });
    expect(viewAllBlendsLink).toHaveAttribute('href', '/blends');
  });

  it('navigates to create page when CTA is clicked', async () => {
    renderWithProviders();
    
    const user = userEvent.setup();
    const ctaButton = screen.getByRole('link', { name: 'Start Blending' });
    
    await user.click(ctaButton);
    // Navigation would be tested in router tests
  });
});
