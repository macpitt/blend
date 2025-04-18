import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpiceContext } from '@/hooks/useSpiceContext';
import Layout from '@/components/Layout';
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import SpiceSelectionSection from '../components/SpiceSelectionSection';
import BlendSelectionSection from '../components/BlendSelectionSection';
import { BlendCreationForm } from '../components/BlendCreationForm';
import type { BlendFormValues } from '@/lib/validations/blend';

const CreateBlendPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { spices, blends, createBlend } = useSpiceContext();

  const [selectedSpices, setSelectedSpices] = useState<number[]>([]);
  const [selectedBlends, setSelectedBlends] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAddSpice = (spiceId: number): void => {
    if (!selectedSpices.includes(spiceId)) {
      setSelectedSpices(prev => [...prev, spiceId]);
      toast.success("Spice added to blend");
    }
  };
  
  const handleAddBlend = (blendId: number): void => {
    if (!selectedBlends.includes(blendId)) {
      setSelectedBlends(prev => [...prev, blendId]);
      toast.success("Blend added to mix");
    }
  };
  
  const removeSpice = (spiceId: number): void => {
    setSelectedSpices(prev => prev.filter(id => id !== spiceId));
    toast.info("Spice removed from blend");
  };
  
  const removeBlend = (blendId: number): void => {
    setSelectedBlends(prev => prev.filter(id => id !== blendId));
    toast.info("Blend removed from mix");
  };
  
  const handleSubmit = async (values: BlendFormValues): Promise<void> => {
    setIsSubmitting(true);
    
    try {
      // Create a clean data object with only the necessary properties
      const blendData = {
        name: values.name,
        description: values.description,
        spices: selectedSpices,
        blends: selectedBlends
      };
      
      const result = await createBlend(blendData);
      
      if (result) {
        toast.success(`${values.name} blend created!`);
        navigate(`/blends/${result.id}`);
      }
    } catch (error) {
      toast.error("Failed to create blend", {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const hasSelectedItems = selectedSpices.length > 0 || selectedBlends.length > 0;
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-spice-cinnamon mb-6">Create New Blend</h1>
        
        <Form>
          <div className="space-y-8">
            <BlendCreationForm 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              hasSelected={hasSelectedItems}
              hideSubmitButton
            />

            <SpiceSelectionSection 
              spices={spices}
              selectedSpices={selectedSpices}
              onAddSpice={handleAddSpice}
              onRemoveSpice={removeSpice}
            />
            
            <BlendSelectionSection 
              blends={blends}
              selectedBlends={selectedBlends}
              onAddBlend={handleAddBlend}
              onRemoveBlend={removeBlend}
            />

            <Button
              type="submit"
              disabled={isSubmitting || !hasSelectedItems}
              className="w-full bg-spice-cinnamon hover:bg-spice-cardamom text-white"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Blend'
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateBlendPage;