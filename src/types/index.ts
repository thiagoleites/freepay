export interface Company {
    id: string;
    name: string;
    cnpj?: string;
    contact: {
        phone?: string;
        email: string;
    };
    address?: string;
    notes?: string;
    createdAt: Date;
}

export interface Project {
    id: string;
    name: string;
    companyId: string;
    company?: Company;
    designLink?: string;
    technologies: string[];
    description: string;
    value: number;
    currency: string;
    startDate: Date;
    deadline: Date;
    status: ProjectStatus;
    createdAt: Date;
}

export type ProjectStatus =
    | 'in_development'
    | 'in_analysis'
    | 'completed'
    | 'cancelled';

export interface DashboardStats {
    activeProjects: number;
    completedProjects: number;
    totalCompanies: number;
    monthlyRevenue: number;
    currency: string;
}