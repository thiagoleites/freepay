import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockCompanies } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function CompanyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;
  
  const existingCompany = isEditing ? mockCompanies.find(c => c.id === id) : null;
  
  const [formData, setFormData] = useState({
    name: existingCompany?.name || "",
    cnpj: existingCompany?.cnpj || "",
    email: existingCompany?.contact.email || "",
    phone: existingCompany?.contact.phone || "",
    address: existingCompany?.address || "",
    notes: existingCompany?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: isEditing ? "Empresa atualizada!" : "Empresa criada!",
      description: `${formData.name} foi ${isEditing ? 'atualizada' : 'criada'} com sucesso.`,
    });

    navigate("/companies");
  };

  const formatCNPJ = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/) || cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
      if (match) {
        return `+55 ${match[1]} ${match[2]}-${match[3]}`;
      }
    }
    return value;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/companies")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Editar Empresa" : "Nova Empresa"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Atualize as informações da empresa" : "Adicione uma nova empresa cliente"}
          </p>
        </div>
      </div>

      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Tech Solutions LTDA"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: formatCNPJ(e.target.value) })}
                placeholder="00.000.000/0000-00"
                maxLength={18}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contato@empresa.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                  placeholder="+55 11 99999-9999"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Cidade, Estado"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Notas importantes sobre a empresa..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="bg-gradient-primary hover:bg-primary-hover">
                {isEditing ? "Atualizar Empresa" : "Criar Empresa"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/companies")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}