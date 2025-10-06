export function formatCurrency(value: number, currency: string = 'BRL'): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency,
    }).format(value);
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatDateShort(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
    }).format(date);
}