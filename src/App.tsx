
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"; // Adding explicit React import
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { initI18n } from "./i18n";

// Initialize i18n
initI18n();

const queryClient = new QueryClient();

const App = () => (
  <I18nProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </I18nProvider>
);

export default App;
