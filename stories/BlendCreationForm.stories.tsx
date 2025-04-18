
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import BlendCreationForm from '../src/features/blends/components/BlendCreationForm';
import { SpiceProvider } from '../src/contexts/SpiceContext';

/**
 * Form component for creating new spice blends. Handles validation
 * and provides feedback to users as they fill out the form.
 */
const meta = {
  title: 'Features/Blends/BlendCreationForm',
  component: BlendCreationForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form for creating new spice blends with name and description fields. Validates user input and provides feedback.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'label', enabled: true },
          { id: 'form-field-multiple-labels', enabled: true }
        ]
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SpiceProvider>
        <div className="w-[600px] p-6 border border-gray-200 rounded-md bg-white shadow-sm">
          <Story />
        </div>
      </SpiceProvider>
    ),
  ],
  argTypes: {
    isSubmitting: {
      control: 'boolean',
      description: 'Whether the form is currently submitting',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    hasSelected: {
      control: 'boolean',
      description: 'Whether any spices or blends have been selected',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    onSubmit: { action: 'submitted' },
  }
} satisfies Meta<typeof BlendCreationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

interface FormWrapperProps {
  isSubmitting?: boolean;
  hasSelected?: boolean;
  name?: string;
  description?: string;
  withErrors?: boolean;
}

const FormWrapper = ({
  isSubmitting = false,
  hasSelected = true,
  name = '',
  description = '',
  withErrors = false
}: FormWrapperProps) => {
  const form = useForm({
    defaultValues: {
      name,
      description
    },
    mode: withErrors ? 'onBlur' : 'onSubmit'
  });
  
  if (withErrors) {
    setTimeout(() => {
      form.setError('name', { 
        type: 'manual',
        message: 'Name is required'
      });
      form.setError('description', { 
        type: 'manual', 
        message: 'Description must be longer'
      });
    }, 100);
  }
  
  return (
    <FormProvider {...form}>
      <BlendCreationForm 
        form={form} 
        onSubmit={() => {}} 
        isSubmitting={isSubmitting}
        hasSelected={hasSelected}
      />
    </FormProvider>
  );
};

export const Default: Story = {
  render: () => <FormWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Default state of the form with empty fields and no validation errors.'
      }
    }
  }
};

export const WithSubmitting: Story = {
  render: () => <FormWrapper isSubmitting={true} />,
  parameters: {
    docs: {
      description: {
        story: 'Shows the form in a submitting state.'
      }
    }
  }
};

export const NoSpicesSelected: Story = {
  render: () => <FormWrapper hasSelected={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Shows a warning when no spices or blends have been selected.'
      }
    }
  }
};

export const WithValidationErrors: Story = {
  render: () => <FormWrapper withErrors={true} />,
  parameters: {
    docs: {
      description: {
        story: 'Shows validation errors for required fields.'
      }
    }
  }
};

export const WithPrefilledValues: Story = {
  render: () => (
    <FormWrapper 
      name="Taco Seasoning" 
      description="A perfect blend of spices for your taco night."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form with pre-filled values, useful for editing existing blends.'
      }
    }
  }
};
