import { Building2, FolderOpen, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { mockDashboardStats, mockProjects } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/currency";

export default function Dashboard() {
  const recentProjects = mockProjects.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio freelancer</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Projetos Ativos"
          value={mockDashboardStats.activeProjects}
          icon={FolderOpen}
          trend={{ value: "+2 este mês", isPositive: true }}
        />
        <StatCard
          title="Projetos Concluídos"
          value={mockDashboardStats.completedProjects}
          icon={TrendingUp}
          variant="success"
          trend={{ value: "+1 este mês", isPositive: true }}
        />
        <StatCard
          title="Empresas Cadastradas"
          value={mockDashboardStats.totalCompanies}
          icon={Building2}
        />
        <StatCard
          title="Faturamento Mensal"
          value={formatCurrency(mockDashboardStats.monthlyRevenue, mockDashboardStats.currency)}
          icon={DollarSign}
          variant="accent"
          trend={{ value: "Meta: R$ 50.000", isPositive: true }}
        />
      </div>

      {/* Recent Projects */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Projetos Recentes</CardTitle>
          <CardDescription>
            Últimos projetos adicionados ao sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gradient-card"
              >
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {project.company?.name} • {formatDate(project.startDate)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(project.value, project.currency)}
                    </span>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Prazo: {formatDate(project.deadline)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}