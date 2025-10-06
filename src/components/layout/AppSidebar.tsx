import { Building2, FolderOpen, BarChart3, Home, Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

const items = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Projetos", url: "/projects", icon: FolderOpen },
    { title: "Empresas", url: "/companies", icon: Building2 },
    { title: "Relatórios", url: "/reports", icon: BarChart3 },
];

const quickActions = [
    { title: "Novo Projeto", url: "/projects/new", icon: Plus },
    { title: "Nova Empresa", url: "/companies/new", icon: Plus },
];

export function AppSidebar() {
    const { state } = useSidebar();
    const location = useLocation();
    const currentPath = location.pathname;
    const isCollapsed = state === "collapsed";

    const isActive = (path: string) => {
        if (path === "/") return currentPath === "/";
        return currentPath.startsWith(path);
    };

    const getNavClasses = (path: string) =>
        isActive(path)
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

    return (
        <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
            <SidebarContent>
                <div className="px-6 py-4">
                    <h2 className={`font-bold text-lg text-sidebar-foreground ${isCollapsed ? 'hidden' : ''}`}>
                        FreelanceManager
                    </h2>
                    {isCollapsed && (
                        <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">FM</span>
                        </div>
                    )}
                </div>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/70">
                        {!isCollapsed && "Navegação"}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url} className={getNavClasses(item.url)}>
                                            <item.icon className="h-4 w-4" />
                                            {!isCollapsed && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/70">
                        {!isCollapsed && "Ações Rápidas"}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {quickActions.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url} className={getNavClasses(item.url)}>
                                            <item.icon className="h-4 w-4" />
                                            {!isCollapsed && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}