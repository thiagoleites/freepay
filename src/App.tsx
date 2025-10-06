import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectForm from "./pages/ProjectForm";
import Companies from "./pages/Companies";
import CompanyForm from "./pages/CompanyForm";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <SidebarProvider>
                    <div className="min-h-screen flex w-full bg-background">
                        <AppSidebar />
                        <div className="flex-1 flex flex-col">
                            <Header />
                            <main className="flex-1 p-6">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/projects" element={<Projects />} />
                                    <Route path="/projects/new" element={<ProjectForm />} />
                                    <Route path="/projects/:id/edit" element={<ProjectForm />} />
                                    <Route path="/companies" element={<Companies />} />
                                    <Route path="/companies/new" element={<CompanyForm />} />
                                    <Route path="/companies/:id/edit" element={<CompanyForm />} />
                                    <Route path="/reports" element={<Reports />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                        </div>
                    </div>
                </SidebarProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;