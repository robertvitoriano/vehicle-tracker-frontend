import { Vehicle } from "@/api/get-vehicles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  vehicles: Vehicle[];
};

const typesMap = {
  "vehicle":"Motor",
  "implement": "Implemento"
}
const statusMap = {
  "active":"Ativo",
  "inactive": "Inativo"
}
const columns = ["Placa", "Frota", "Tipo", "Modelo", "Status"];

export const VehicleTable = ({ vehicles }: Props) => {
  return (
    <div className="bg-primary border border-accent rounded-lg pb-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column,index)=><TableHead key={index}>{column}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map(({ plate, fleet, type, model, status,id }) => (
            <TableRow key={id}>
              <TableCell>{plate}</TableCell>
              <TableCell>{fleet || "Não informada"}</TableCell>
              <TableCell>{typesMap[type]}</TableCell>
              <TableCell>{model}</TableCell>
              <TableCell>{statusMap[status]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
