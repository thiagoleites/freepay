import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { User, Bell } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                </Button>
            </div>
        </header>
    );
}