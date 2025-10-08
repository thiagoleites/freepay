import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/types";

interface ProjectStatusBadgeProps {
    status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
    const getStatusConfig = (status: ProjectStatus) => {
        switch (status) {
            case 'in_development':
                return {
                    label: 'Em Desenvolvimento',
                    variant: 'default' as const,
                };
            case 'in_analysis':
                return {
                    label: 'Em Análise',
                    variant: 'secondary' as const,
                };
            case 'completed':
                return {
                    label: 'Concluído',
                    variant: 'default' as const,
                    className: 'bg-success text-success-foreground hover:bg-success/80',
                };
            case 'cancelled':
                return {
                    label: 'Cancelado',
                    variant: 'destructive' as const,
                };
            default:
                return {
                    label: 'Desconhecido',
                    variant: 'outline' as const,
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <Badge
            variant={config.variant}
            className={config.className}
        >
            {config.label}
        </Badge>
    );
}