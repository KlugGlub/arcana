import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import DailyCard from "@/pages/DailyCard";
import Compatibility from "@/pages/Compatibility";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUserName(name);
  };

  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem("usuario");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar userName={userName} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/carta-diaria" element={<DailyCard />} />
            <Route path="/compatibilidade" element={<Compatibility />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
