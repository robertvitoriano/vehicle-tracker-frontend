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

const columns = ["Placa", "Frota", "Tipo", "Modelo", "Status"];

export const VehicleTable = ({ vehicles }: Props) => {
  return (
    <div className="bg-primary border border-accent rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column)=><TableHead>{column}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map(({ plate, fleet, type, model, status }) => (
            <TableRow>
              <TableCell>{plate}</TableCell>
              <TableCell>{fleet || "Não informada"}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>{model}</TableCell>
              <TableCell>{status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
