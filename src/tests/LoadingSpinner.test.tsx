
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-6 w-6'); // Default size is 'md'
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-4 w-4');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-10 w-10');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="text-blue-500" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('text-blue-500');
  });

  it('has correct accessible name', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });
});
