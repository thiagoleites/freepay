import { useState } from "react";
import { Calendar, Download, TrendingUp, DollarSign, Building2, FolderOpen, FileText, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { mockProjects, mockCompanies } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/currency";

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: new Date().toISOString().split('T')[0]
  });
  const [reportType, setReportType] = useState("monthly");
  const [filterCompany, setFilterCompany] = useState("all");

  // Filter data based on date range and company
  const filteredProjects = mockProjects.filter(project => {
    const projectDate = project.startDate;
    const inDateRange = projectDate >= new Date(dateRange.startDate) && projectDate <= new Date(dateRange.endDate);
    const matchesCompany = filterCompany === "all" || project.companyId === filterCompany;
    return inDateRange && matchesCompany;
  });

  // Calculate metrics
  const totalRevenue = filteredProjects
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.value, 0);
  
  const activeProjects = filteredProjects.filter(p => p.status === 'in_development').length;
  const completedProjects = filteredProjects.filter(p => p.status === 'completed').length;
  const cancelledProjects = filteredProjects.filter(p => p.status === 'cancelled').length;

  // Revenue by month
  const revenueByMonth = filteredProjects
    .filter(p => p.status === 'completed')
    .reduce((acc, project) => {
      const month = project.startDate.toISOString().substring(0, 7);
      acc[month] = (acc[month] || 0) + project.value;
      return acc;
    }, {} as Record<string, number>);

  // Projects by company
  const projectsByCompany = mockCompanies.map(company => {
    const companyProjects = filteredProjects.filter(p => p.companyId === company.id);
    const revenue = companyProjects.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.value, 0);
    return {
      company: company.name,
      projectCount: companyProjects.length,
      completedCount: companyProjects.filter(p => p.status === 'completed').length,
      revenue
    };
  }).filter(item => item.projectCount > 0);

  const handleExportPDF = () => {
    // Simulate PDF export
    alert("Relatório será exportado em PDF (funcionalidade simulada)");
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    alert("Relatório será exportado em Excel (funcionalidade simulada)");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análise detalhada dos seus projetos e faturamento</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <FileText className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Filtros do Relatório
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Inicial</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Relatório</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Select value={filterCompany} onValueChange={setFilterCompany}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Empresas</SelectItem>
                  {mockCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Faturamento Total"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          variant="accent"
        />
        <StatCard
          title="Projetos Ativos"
          value={activeProjects}
          icon={FolderOpen}
        />
        <StatCard
          title="Projetos Concluídos"
          value={completedProjects}
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Projetos Cancelados"
          value={cancelledProjects}
          icon={Building2}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue by Month */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Faturamento por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(revenueByMonth)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([month, revenue]) => (
                <div key={month} className="flex justify-between items-center p-3 bg-gradient-card rounded-lg">
                  <span className="font-medium">
                    {new Date(month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-lg font-bold text-accent">
                    {formatCurrency(revenue)}
                  </span>
                </div>
              ))}
              {Object.keys(revenueByMonth).length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum faturamento no período selecionado
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Projects by Company */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Projetos por Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projectsByCompany.map((item) => (
                <div key={item.company} className="p-4 border rounded-lg bg-gradient-card">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{item.company}</h4>
                    <span className="text-lg font-bold text-accent">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      {item.projectCount} projeto{item.projectCount !== 1 ? 's' : ''}
                    </Badge>
                    <Badge variant="outline" className="bg-success-light text-success">
                      {item.completedCount} concluído{item.completedCount !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              ))}
              {projectsByCompany.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum projeto no período selecionado
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Projects Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Detalhamento de Projetos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Início</TableHead>
                  <TableHead>Prazo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.company?.name}</TableCell>
                    <TableCell>{formatCurrency(project.value, project.currency)}</TableCell>
                    <TableCell>
                      <ProjectStatusBadge status={project.status} />
                    </TableCell>
                    <TableCell>{formatDate(project.startDate)}</TableCell>
                    <TableCell>{formatDate(project.deadline)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum projeto encontrado no período selecionado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}