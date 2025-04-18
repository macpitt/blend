import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SpiceProvider } from "@/contexts/SpiceContext";
import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy-loaded page components
const HomePage = lazy(() => import("./pages/HomePage"));
const BlendListPage = lazy(() => import("./features/blends/pages/BlendListPage"));
const BlendDetailPage = lazy(() => import("./features/blends/pages/BlendDetailPage"));
const CreateBlendPage = lazy(() => import("./features/blends/pages/CreateBlendPage"));
const SpiceListPage = lazy(() => import("./features/spices/pages/SpiceListPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const AppLoading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Loading SpiceBlend...</h1>
      <LoadingSpinner size="lg" />
    </div>
  </div>
);

// Create a new QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SpiceProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<AppLoading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blends" element={<BlendListPage />} />
                <Route path="/blends/:id" element={<BlendDetailPage />} />
                <Route path="/create" element={<CreateBlendPage />} />
                <Route path="/spices" element={<SpiceListPage />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SpiceProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;