import { Company, Project, DashboardStats } from '@/types';

export const mockCompanies: Company[] = [
    {
        id: '1',
        name: 'Tech Solutions LTDA',
        cnpj: '12.345.678/0001-90',
        contact: {
            phone: '+55 11 99999-9999',
            email: 'contato@techsolutions.com.br',
        },
        address: 'São Paulo, SP',
        notes: 'Cliente de longa data, sempre pontual nos pagamentos',
        createdAt: new Date('2024-01-15'),
    },
    {
        id: '2',
        name: 'Startup Inovadora',
        contact: {
            email: 'hello@startup.com',
        },
        notes: 'Empresa em crescimento, projetos interessantes',
        createdAt: new Date('2024-02-20'),
    },
    {
        id: '3',
        name: 'Consultoria Digital',
        cnpj: '98.765.432/0001-10',
        contact: {
            phone: '+55 21 88888-8888',
            email: 'projetos@consultoria.com.br',
        },
        address: 'Rio de Janeiro, RJ',
        createdAt: new Date('2024-03-10'),
    },
];

export const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Sistema de Gestão Interna',
        companyId: '1',
        designLink: 'https://figma.com/design123',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        description: 'Sistema completo para gestão de funcionários e processos internos da empresa.',
        value: 15000,
        currency: 'BRL',
        startDate: new Date('2024-08-01'),
        deadline: new Date('2024-10-30'),
        status: 'in_development',
        createdAt: new Date('2024-07-20'),
    },
    {
        id: '2',
        name: 'Landing Page Institucional',
        companyId: '2',
        designLink: 'https://figma.com/design456',
        technologies: ['React', 'Tailwind CSS'],
        description: 'Landing page moderna e responsiva para apresentação da empresa.',
        value: 3500,
        currency: 'BRL',
        startDate: new Date('2024-09-01'),
        deadline: new Date('2024-09-15'),
        status: 'completed',
        createdAt: new Date('2024-08-25'),
    },
    {
        id: '3',
        name: 'E-commerce Platform',
        companyId: '1',
        technologies: ['React', 'Next.js', 'Stripe'],
        description: 'Plataforma completa de e-commerce com pagamentos integrados.',
        value: 25000,
        currency: 'BRL',
        startDate: new Date('2024-10-01'),
        deadline: new Date('2024-12-15'),
        status: 'in_analysis',
        createdAt: new Date('2024-09-10'),
    },
    {
        id: '4',
        name: 'App Mobile Delivery',
        companyId: '3',
        designLink: 'https://figma.com/design789',
        technologies: ['React Native', 'Firebase'],
        description: 'Aplicativo móvel para delivery com sistema de pedidos em tempo real.',
        value: 18000,
        currency: 'BRL',
        startDate: new Date('2024-07-01'),
        deadline: new Date('2024-08-30'),
        status: 'cancelled',
        createdAt: new Date('2024-06-15'),
    },
];

// Add company references to projects
mockProjects.forEach(project => {
    project.company = mockCompanies.find(company => company.id === project.companyId);
});

export const mockDashboardStats: DashboardStats = {
    activeProjects: mockProjects.filter(p => p.status === 'in_development').length,
    completedProjects: mockProjects.filter(p => p.status === 'completed').length,
    totalCompanies: mockCompanies.length,
    monthlyRevenue: mockProjects
        .filter(p => p.status === 'completed' &&
            p.startDate.getMonth() === new Date().getMonth())
        .reduce((total, p) => total + p.value, 0),
    currency: 'BRL',
};