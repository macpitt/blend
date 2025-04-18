
import { Link } from 'react-router-dom';
import { useSpiceContext } from '@/hooks/useSpiceContext';
import Layout from '@/components/Layout';
import BlendCard from '@/features/blends/components/BlendCard';
import SpiceCard from '@/features/spices/components/SpiceCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const HomePage = () => {
  //const { blends, spices, loadingBlends, loadingSpices, error } = useSpiceContext();
  const context = useSpiceContext();
console.log('🧪 useSpiceContext value:', context);

if (!context) return <div>❗ No context</div>;

const { blends, spices, loadingBlends, loadingSpices, error } = context;

  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-spice-cinnamon mb-4">Welcome to SpiceBlend</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and create amazing spice blends for your culinary adventures.
        </p>
      </div>
      
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-spice-cinnamon">Featured Blends</h2>
          <Link 
            to="/blends" 
            className="text-spice-cinnamon hover:text-spice-cardamom transition-colors font-medium"
          >
            View All
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {loadingBlends ? (
          <div className="py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(blends) && blends.slice(0, 3).map(blend => (
              <BlendCard key={blend.id} blend={blend} />
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-spice-cinnamon">Popular Spices</h2>
          <Link 
            to="/spices" 
            className="text-spice-cinnamon hover:text-spice-cardamom transition-colors font-medium"
          >
            View All
          </Link>
        </div>
        
        {loadingSpices ? (
          <div className="py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(spices) && spices.slice(0, 4).map(spice => (
              <SpiceCard key={spice.id} spice={spice} />
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-spice-vanilla p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-spice-cinnamon mb-4">Create Your Own Blend</h2>
        <p className="mb-6 text-gray-700">
          Mix and match spices or combine existing blends to create your perfect flavor combination.
        </p>
        <Link 
          to="/create" 
          className="inline-block bg-spice-cinnamon hover:bg-spice-cardamom text-white font-bold py-2 px-6 rounded-md transition-colors"
        >
          Start Blending
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage;
