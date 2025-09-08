import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Students } from "@/pages/Students";
import { Teachers } from "@/pages/Teachers";
import { Classes } from "@/pages/Classes";
import { Settings } from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <MainLayout>{children}</MainLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/students" element={
        <ProtectedRoute>
          <Students />
        </ProtectedRoute>
      } />
      
      <Route path="/teachers" element={
        <ProtectedRoute>
          <Teachers />
        </ProtectedRoute>
      } />
      
      <Route path="/classes" element={
        <ProtectedRoute>
          <Classes />
        </ProtectedRoute>
      } />
      
      <Route path="/attendance" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-3xl font-bold">Attendance</h1>
            <p className="text-muted-foreground">Attendance management coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/grades" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-3xl font-bold">Grades</h1>
            <p className="text-muted-foreground">Grade management coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/schedule" element={
        <ProtectedRoute>
          <div className="p-6">
            <h1 className="text-3xl font-bold">Schedule</h1>
            <p className="text-muted-foreground">Schedule management coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
