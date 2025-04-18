import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpiceProvider } from '@/contexts/SpiceContext';
import type { ReactElement } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SpiceProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </SpiceProvider>
    </QueryClientProvider>
  );
}

function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
export { render };