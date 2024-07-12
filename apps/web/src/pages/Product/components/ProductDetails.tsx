import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

export default function ProductDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do produto</CardTitle>
        <CardDescription>
          Verifique aqui, os detalhes do produto e a quantidade dele no estoque.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4 grid">
        <Input label="Nome" />

        <Textarea
          id="description"
          label="Descrição"
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
          className="min-h-32"
        />
      </CardContent>
    </Card>
  );
}
