
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! This page doesn't exist.</p>
        <p className="text-gray-500 mb-8">
          We can't seem to find the spice blend you're looking for.
        </p>
        <Link 
          to="/" 
          className="bg-spice-cinnamon hover:bg-spice-cardamom text-white font-bold py-2 px-6 rounded-md transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
