
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SpiceCard from '@/features/spices/components/SpiceCard';
import { Spice } from '@/types';

describe('SpiceCard Component', () => {
  const mockSpice: Spice = {
    id: 1,
    name: 'Paprika',
    price: '$3.99',
    color: 'E53935',
    heat: 2
  };

  const mockSpiceWithImage: Spice = {
    ...mockSpice,
    image: 'https://example.com/paprika.jpg'
  };

  it('renders the spice name correctly', () => {
    render(<SpiceCard spice={mockSpice} />);
    expect(screen.getByText('Paprika')).toBeInTheDocument();
  });

  it('renders the price correctly', () => {
    render(<SpiceCard spice={mockSpice} />);
    expect(screen.getByText('$3.99')).toBeInTheDocument();
  });

  it('displays the correct heat level', () => {
    render(<SpiceCard spice={mockSpice} />);
    // Heat level 2 should render 2 flame icons
    const flameIcons = screen.getAllByText('', { selector: 'svg.text-red-500' });
    expect(flameIcons).toHaveLength(2);
  });

  it('shows "No Heat" text when heat is 0', () => {
    const noHeatSpice = { ...mockSpice, heat: 0 };
    render(<SpiceCard spice={noHeatSpice} />);
    expect(screen.getByText('No Heat')).toBeInTheDocument();
  });

  it('applies the spice color to the card border', () => {
    render(<SpiceCard spice={mockSpice} />);
    const card = screen.getByRole('article', { hidden: true });
    expect(card).toHaveStyle('border-top-color: #E53935');
  });

  it('renders the image when provided', () => {
    render(<SpiceCard spice={mockSpiceWithImage} />);
    const image = screen.getByRole('presentation', { hidden: true });
    expect(image).toHaveStyle(`background-image: url(${mockSpiceWithImage.image})`);
  });

  it('has correct aria attributes for accessibility', () => {
    render(<SpiceCard spice={mockSpice} />);
    const card = screen.getByRole('article', { hidden: true });
    expect(card).toHaveClass('spice-card');
  });
});
