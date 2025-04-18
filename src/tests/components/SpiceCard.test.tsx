import { describe, it, expect } from 'vitest';
import { render, screen } from '../test-utils';
import SpiceCard from '@/features/spices/components/SpiceCard';
import type { Spice } from '@/types';

describe('SpiceCard', () => {
  const mockSpice: Spice = {
    id: 1,
    name: 'Test Spice',
    price: '$9.99',
    color: 'FF0000',
    heat: 3,
    image: 'https://example.com/spice.jpg'
  };

  it('renders spice information correctly', () => {
    render(<SpiceCard spice={mockSpice} />);
    
    expect(screen.getByText('Test Spice')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    
    // Check heat level icons
    const heatIcons = screen.getAllByRole('img', { hidden: true });
    expect(heatIcons).toHaveLength(3);
  });

  it('handles spices with no heat', () => {
    const noHeatSpice = { ...mockSpice, heat: 0 };
    render(<SpiceCard spice={noHeatSpice} />);
    
    expect(screen.getByText('No Heat')).toBeInTheDocument();
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
  });

  it('applies correct color styling', () => {
    render(<SpiceCard spice={mockSpice} />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveStyle({ borderTopColor: '#FF0000' });
  });

  it('renders image when provided', () => {
    render(<SpiceCard spice={mockSpice} />);
    
    const image = screen.getByAltText('Test Spice');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/spice.jpg');
  });

  it('handles missing image gracefully', () => {
    const spiceWithoutImage = { ...mockSpice, image: undefined };
    render(<SpiceCard spice={spiceWithoutImage} />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});