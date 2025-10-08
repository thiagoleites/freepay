import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'accent' | 'success';
}

export function StatCard({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'accent':
        return 'bg-gradient-accent text-white';
      case 'success':
        return 'bg-accent-light border-accent/20';
      default:
        return 'bg-gradient-card';
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case 'accent':
        return 'text-white/80';
      case 'success':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className={`${getVariantClasses()} shadow-md border-0`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${variant === 'accent' ? 'text-white/80' : 'text-muted-foreground'}`}>
              {title}
            </p>
            <p className={`text-2xl font-bold mt-2 ${variant === 'accent' ? 'text-white' : 'text-foreground'}`}>
              {value}
            </p>
            {trend && (
              <p className={`text-xs mt-1 ${
                variant === 'accent' 
                  ? 'text-white/70' 
                  : trend.isPositive 
                    ? 'text-success' 
                    : 'text-destructive'
              }`}>
                {trend.value}
              </p>
            )}
          </div>
          <Icon className={`h-8 w-8 ${getIconClasses()}`} />
        </div>
      </CardContent>
    </Card>
  );
}