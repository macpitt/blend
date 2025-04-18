import { memo } from 'react';
import { Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LazyImage } from '@/components/LazyImage';
import type { Spice } from '@/types';

interface SpiceCardProps {
  spice: Spice;
}

const SpiceHeatLevels = ['No Heat', 'Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme'];

const SpiceCard = memo(function SpiceCard({ spice }: SpiceCardProps): JSX.Element {
  const { name, price, color, heat, image } = spice;
  const heatText = SpiceHeatLevels[heat] || 'Unknown';
  
  return (
    <Card 
      className="spice-card p-4 border-t-4 overflow-hidden relative" 
      style={{ borderTopColor: `#${color}` }}
      role="article"
    >
      {image && (
        <div className="absolute top-0 right-0 w-16 h-16 -mr-5 -mt-5 rounded-full overflow-hidden">
          <LazyImage
            src={image}
            alt={name}
            className="w-full h-full object-cover opacity-20"
            fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
          />
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-lg">{name}</h3>
        <span className="text-lg font-medium text-green-700">{price}</span>
      </div>
      
      <div className="mt-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {heat > 0 ? (
            Array(heat).fill(null).map((_, idx) => (
              <Flame 
                key={`heat-${idx}`} 
                className="text-red-500" 
                size={16} 
                fill="currentColor"
                aria-hidden="true"
              />
            ))
          ) : (
            <span className="text-sm text-gray-500">{heatText}</span>
          )}
        </div>
      </div>
    </Card>
  );
});

export default SpiceCard;