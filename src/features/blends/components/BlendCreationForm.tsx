import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from '@/components/ui/form-error';
import { blendFormSchema, type BlendFormValues } from '@/lib/validations/blend';

interface BlendCreationFormProps {
  onSubmit: (values: BlendFormValues) => Promise<void>;
  isSubmitting: boolean;
  hasSelected: boolean;
  hideSubmitButton?: boolean;
  initialValues?: Partial<BlendFormValues>;
}

export function BlendCreationForm({
  onSubmit,
  isSubmitting,
  hasSelected,
  hideSubmitButton = false,
  initialValues
}: BlendCreationFormProps): JSX.Element {
  const form = useForm<BlendFormValues>({
    resolver: zodResolver(blendFormSchema),
    defaultValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      spices: initialValues?.spices || [],
      blends: initialValues?.blends || []
    },
    mode: 'onBlur'
  });

  const handleSubmit = async (values: BlendFormValues): Promise<void> => {
    try {
      await onSubmit(values);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        form.setError('root', { message: error.message });
      } else {
        form.setError('root', { message: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Blend Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter blend name" 
                  {...field}
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your blend" 
                  className="h-24" 
                  {...field}
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {form.formState.errors.root && (
          <FormError message={form.formState.errors.root.message} />
        )}
        
        {!hasSelected && (
          <div className="p-3 rounded-md bg-amber-50 text-amber-700 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">Please select at least one spice or blend to continue</p>
          </div>
        )}
      </form>
    </Form>
  );
}

export default BlendCreationForm;