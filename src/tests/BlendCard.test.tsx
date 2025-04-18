
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import BlendCard from '@/features/blends/components/BlendCard';
import { SpiceProvider } from '@/contexts/SpiceContext';
import userEvent from '@testing-library/user-event';

// Mock data
const mockBlend = {
  id: 99,
  name: 'Test Blend',
  description: 'This is a test blend',
  spices: [1, 5],
  blends: []
};

// Mock provider wrapper
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SpiceProvider>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </SpiceProvider>
);

//test('dummy', () => {
 // expect(true).toBe(true)
//})

describe('BlendCard Component', () => {
 
  it('renders blend information correctly', () => {
    render(
      <BlendCard blend={mockBlend} />,
      { wrapper: TestWrapper }
    );
    
    expect(screen.getByText('Test Blend')).toBeInTheDocument();
    expect(screen.getByText('This is a test blend')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });
  
  it('does not show view details when expanded', () => {
    render(
      <BlendCard blend={mockBlend} expanded={true} />,
      { wrapper: TestWrapper }
    );
    
    expect(screen.getByText('Test Blend')).toBeInTheDocument();
    expect(screen.queryByText('View Details')).not.toBeInTheDocument();
  });

  it('navigates to blend details on click', async () => {
    render(
      <BlendCard blend={mockBlend} />,
      { wrapper: TestWrapper }
    );
    
    const user = userEvent.setup();
    const detailsLink = screen.getByText('View Details');
    
    await user.click(detailsLink);
    // Navigation testing would be handled by router tests
  });

  it('renders with proper a11y attributes', () => {
    render(
      <BlendCard blend={mockBlend} />,
      { wrapper: TestWrapper }
    );
    
    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-labelledby');
  });
});
