
import { Link } from 'react-router-dom';
import { SpiceBlend, Spice } from '@/types';
import { useSpiceContext } from '@/hooks/useSpiceContext';
import { Badge } from '@/components/ui/badge';

interface BlendCardProps {
  blend: SpiceBlend;
  expanded?: boolean;
}

const BlendCard = ({ blend, expanded = false }: BlendCardProps) => {
  const { getSpiceById, getBlendById } = useSpiceContext();
  const { id, name, description, spices: spiceIds, blends: blendIds } = blend;
  
  // Get spice objects
  const spiceObjects = spiceIds.map(id => {
    return getSpiceById(id);
  }).filter(Boolean) as Spice[];
  
  // Get blend names
  const blendNames = blendIds.map(id => {
    const childBlend = getBlendById(id);
    return childBlend?.name || `Unknown Blend (ID: ${id})`;
  });
  
  return (
    <div className="spice-blend-card animate-fade-in">
      <h3 className="text-xl font-bold mb-2 text-spice-cinnamon">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {(spiceObjects.length > 0 || expanded) && (
        <div className="mb-3">
          <h4 className="font-medium text-sm text-gray-500 mb-2">Spices:</h4>
          <div className="flex flex-wrap gap-2">
            {spiceObjects.map((spice, index) => (
              <Badge 
                key={`spice-${index}`}
                variant="outline" 
                className="bg-opacity-20"
                style={{
                  backgroundColor: `#${spice.color}20`, 
                  color: `#${spice.color}`, 
                  borderColor: `#${spice.color}40`
                }}
              >
                {spice.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {(blendIds.length > 0 || expanded) && (
        <div className="mb-3">
          <h4 className="font-medium text-sm text-gray-500 mb-1">Includes Blends:</h4>
          <ul className="list-disc pl-5 text-sm">
            {blendNames.map((name, index) => (
              <li key={`blend-${index}`}>{name}</li>
            ))}
          </ul>
        </div>
      )}
      
      {!expanded && (
        <Link 
          to={`/blends/${id}`} 
          className="inline-block mt-2 text-spice-cinnamon hover:text-spice-cardamom font-medium transition-colors"
          aria-label={`View details of ${name} blend`}
        >
          View Details
        </Link>
      )}
    </div>
  );
};

export default BlendCard;
