import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configure the MSW worker with the handlers
export const worker = setupWorker(...handlers);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
// Add event listeners for better debugging
/*worker.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted request:', request.method, request.url);
});

worker.events.on('response:mocked', ({ response }) => {
  console.log('MSW mocked response:', response.status);
});

worker.events.on('unhandledException', (error) => {
  console.error('MSW exception:', error);
});

console.log('MSW worker configuration loaded sd d');*/