import { useState } from "react";
import { Plus, Search, Edit, Trash2, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockCompanies, mockProjects } from "@/data/mockData";
import { formatDate } from "@/utils/currency";
import { Company } from "@/types";

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState(mockCompanies);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCompany = (id: string) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  const getCompanyProjects = (companyId: string) => {
    return mockProjects.filter(p => p.companyId === companyId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Empresas</h1>
          <p className="text-muted-foreground">Gerencie suas empresas clientes</p>
        </div>
        <Button asChild className="bg-gradient-primary hover:bg-primary-hover">
          <Link to="/companies/new">
            <Plus className="h-4 w-4 mr-2" />
            Nova Empresa
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Buscar Empresas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => {
          const projects = getCompanyProjects(company.id);
          const activeProjects = projects.filter(p => p.status === 'in_development').length;
          const completedProjects = projects.filter(p => p.status === 'completed').length;

          return (
            <Card key={company.id} className="shadow-md hover:shadow-lg transition-shadow hover-scale">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-light rounded-lg">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      {company.cnpj && (
                        <p className="text-sm text-muted-foreground">CNPJ: {company.cnpj}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/companies/${company.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteCompany(company.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{company.contact.email}</span>
                  </div>
                  {company.contact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{company.contact.phone}</span>
                    </div>
                  )}
                  {company.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{company.address}</span>
                    </div>
                  )}
                </div>

                {/* Project Stats */}
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {activeProjects} ativo{activeProjects !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="outline" className="bg-success-light text-success">
                    {completedProjects} concluído{completedProjects !== 1 ? 's' : ''}
                  </Badge>
                </div>

                {/* Notes */}
                {company.notes && (
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    {company.notes}
                  </p>
                )}

                {/* Created Date */}
                <p className="text-xs text-muted-foreground">
                  Cadastrado em {formatDate(company.createdAt)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma empresa encontrada</p>
        </div>
      )}
    </div>
  );
}