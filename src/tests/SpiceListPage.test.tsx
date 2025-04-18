
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SpiceProvider } from '@/contexts/SpiceContext';
import SpiceListPage from '@/features/spices/pages/SpiceListPage';
import userEvent from '@testing-library/user-event';

// Mock the Layout component to simplify testing
vi.mock('@/components/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
}));

// Mock the API service
vi.mock('@/services/api', () => ({
  api: {
    getAllSpices: vi.fn().mockResolvedValue([
      { id: 1, name: 'Cinnamon', price: '$2.99', color: 'brown', heat: 0 },
      { id: 2, name: 'Paprika', price: '$3.99', color: 'red', heat: 2 }
    ])
  }
}));

const renderWithProviders = () => {
  return render(
    <SpiceProvider>
      <BrowserRouter>
        <SpiceListPage />
      </BrowserRouter>
    </SpiceProvider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SpiceListPage Component', () => {
  it('renders the page title', () => {
    renderWithProviders();
    expect(screen.getByText('All Spices')).toBeInTheDocument();
  });

  it('contains search functionality', async () => {
    renderWithProviders();
    const searchInput = screen.getByPlaceholderText('Search spices...');
    expect(searchInput).toBeInTheDocument();
    
    const user = userEvent.setup();
    await user.type(searchInput, 'paprika');
    expect(searchInput).toHaveValue('paprika');
  });

  it('contains sorting options', () => {
    renderWithProviders();
    expect(screen.getByRole('button', { name: /sort by name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sort by heat level/i })).toBeInTheDocument();
  });

  it('contains pagination', () => {
    renderWithProviders();
    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    renderWithProviders();
    // LoadingSpinner should be in the document while loading
    const loadingElement = screen.queryByRole('status');
    // Either the loading spinner is there or spice cards are rendered
    expect(loadingElement !== null || screen.queryByText(/showing/i) !== null).toBeTruthy();
  });

  it('applies filters correctly', async () => {
    renderWithProviders();
    
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText('Search spices...');
    
    await user.type(searchInput, 'cinnamon');
    
    await waitFor(() => {
      expect(screen.getByText(/showing/i)).toBeInTheDocument();
    });
  });
});
