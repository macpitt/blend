import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function enableMocking() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    try {
      console.log('Loading MSW worker...');
      const { worker } = await import('./mocks/browser');
      
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: `${window.location.origin}/mockServiceWorker.js`
        }
      });
      
      console.log('MSW worker started successfully');
    } catch (error) {
      console.error('MSW worker initialization failed:', error);
    }
  }
}

// Initialize the app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found!');
}

// Start the app
enableMocking().then(() => {
  createRoot(rootElement).render(<App />);
}).catch(error => {
  console.error('Error during app initialization:', error);
  // Render the app even if MSW fails
  createRoot(rootElement).render(<App />);
});