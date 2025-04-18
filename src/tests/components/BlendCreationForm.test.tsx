import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { BlendCreationForm } from '@/features/blends/components/BlendCreationForm';
import type { BlendFormValues } from '@/lib/validations/blend';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('BlendCreationForm', () => {
  const mockSubmit = vi.fn();
  const defaultProps = {
    onSubmit: mockSubmit,
    isSubmitting: false,
    hasSelected: true
  };
  it('renders form fields correctly', () => {
    render(<BlendCreationForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/blend name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create blend/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<BlendCreationForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /create blend/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least/i)).toBeInTheDocument();
      expect(screen.getByText(/description must be at least/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(<BlendCreationForm {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/blend name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    await userEvent.type(nameInput, 'Test Blend');
    await userEvent.type(descriptionInput, 'This is a test blend description');
    
    const submitButton = screen.getByRole('button', { name: /create blend/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Test Blend',
        description: 'This is a test blend description',
        spices: [],
        blends: []
      });
    });
  });

  it('disables form when submitting', () => {
    render(<BlendCreationForm {...defaultProps} isSubmitting={true} />);
    
    expect(screen.getByLabelText(/blend name/i)).toBeDisabled();
    expect(screen.getByLabelText(/description/i)).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/creating/i)).toBeInTheDocument();
  });

  it('shows warning when no items selected', () => {
    render(<BlendCreationForm {...defaultProps} hasSelected={false} />);
    
    expect(screen.getByText(/please select at least one spice or blend/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles form errors gracefully', async () => {
    const errorMessage = 'Failed to create blend';
    const mockErrorSubmit = vi.fn().mockRejectedValue(new Error(errorMessage));
    
    render(<BlendCreationForm {...defaultProps} onSubmit={mockErrorSubmit} />);
    
    await userEvent.type(screen.getByLabelText(/blend name/i), 'Test Blend');
    await userEvent.type(screen.getByLabelText(/description/i), 'Test description that is long enough');
    
    await userEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});