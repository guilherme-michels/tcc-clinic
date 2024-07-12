import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";

interface OrderHeaderCardProps {
  progressPercentage?: number;
  addButton?: boolean;
  title?: string;
  value?: string;
  description?: string;
}

export function OrderHeaderCard({
  progressPercentage,
  addButton,
  description,
  title,
  value,
}: OrderHeaderCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>

      {addButton && (
        <CardFooter>
          <Button className="h-8">+ Adicionar transferência</Button>
        </CardFooter>
      )}

      {progressPercentage && (
        <CardFooter>
          <Progress value={progressPercentage} aria-label="12% increase" />
        </CardFooter>
      )}
    </Card>
  );
}
