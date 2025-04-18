
import { SpiceBlend } from '@/types';
import BlendCard from '@/features/blends/components/BlendCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlendGridProps {
  blends: SpiceBlend[];
}

const BlendGrid = ({ blends }: BlendGridProps) => {
  if (blends.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No blends found matching your search.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-350px)] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blends.map(blend => (
          <BlendCard key={blend.id} blend={blend} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default BlendGrid;
