import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSpiceContext } from '@/hooks/useSpiceContext';
import Layout from '@/components/Layout';
import SpiceCard from '@/features/spices/components/SpiceCard';
import BlendCard from '@/features/blends/components/BlendCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Spice, SpiceBlend } from '@/types';

const BlendDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const blendId = parseInt(id || '0', 10);
  
  const { 
    getBlendById,
    getSpiceById,
    loadingBlends,
    error 
  } = useSpiceContext();
  
  const [blend, setBlend] = useState<SpiceBlend | undefined>(undefined);
  const [allSpices, setAllSpices] = useState<Spice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [childBlends, setChildBlends] = useState<SpiceBlend[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (!isNaN(blendId)) {
        const blendData = getBlendById(blendId);
        setBlend(blendData);
        
        if (blendData) {
          try {
            const collectAllSpicesInBlend = (
              blendId: number, 
              processedBlends = new Set<number>()
            ): Spice[] => {
              if (processedBlends.has(blendId)) return [];
              processedBlends.add(blendId);
              
              const blend = getBlendById(blendId);
              if (!blend) return [];
              
              const spices = blend.spices
                .map(id => getSpiceById(id))
                .filter(Boolean) as Spice[];
              
              for (const nestedBlendId of blend.blends) {
                const nestedSpices = collectAllSpicesInBlend(nestedBlendId, processedBlends);
                spices.push(...nestedSpices);
              }
              
              return spices;
            };
            
            const spices = collectAllSpicesInBlend(blendId);
            
            const uniqueSpices = Array.from(
              new Map(spices.map(spice => [spice.id, spice]))
            ).map(([_, spice]) => spice);
            
            setAllSpices(uniqueSpices);
            
            const children = blendData.blends
              .map(id => getBlendById(id))
              .filter(Boolean) as SpiceBlend[];
            setChildBlends(children);
          } catch (err) {
            console.error('Error fetching blend details:', err);
          }
        }
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [blendId, getBlendById, getSpiceById]);
  
  if (loadingBlends || isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <p>{error}</p>
        </div>
      </Layout>
    );
  }
  
  if (!blend) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Blend Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the blend you're looking for.</p>
          <Link 
            to="/blends" 
            className="inline-block bg-spice-cinnamon hover:bg-spice-cardamom text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Back to All Blends
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <Link 
          to="/blends"
          className="text-spice-cinnamon hover:text-spice-cardamom transition-colors flex items-center mb-4"
        >
          <span className="mr-1">←</span> Back to All Blends
        </Link>
        <h1 className="text-3xl font-bold text-spice-cinnamon mb-2">{blend.name}</h1>
        <p className="text-lg text-gray-600 mb-8">{blend.description}</p>
        
        {childBlends.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Included Blends</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {childBlends.map(childBlend => (
                <BlendCard key={childBlend.id} blend={childBlend} />
              ))}
            </div>
          </div>
        )}
        
        <h2 className="text-2xl font-bold mb-4">All Spices in this Blend</h2>
        {allSpices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allSpices.map(spice => (
              <SpiceCard key={spice.id} spice={spice} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">This blend doesn't contain any spices.</p>
        )}
      </div>
    </Layout>
  );
};

export default BlendDetailPage;
