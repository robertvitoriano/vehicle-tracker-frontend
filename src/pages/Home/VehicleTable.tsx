import { Vehicle } from "@/api/get-vehicles";
import {
  Table,
  TableBody,
  TableCaption,
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
          <TableRow>
            <TableCell>EAD 7328</TableCell>
            <TableCell>000001</TableCell>
            <TableCell>Motor</TableCell>
            <TableCell>FH 460</TableCell>
            <TableCell>Em viagem</TableCell>
          </TableRow>
          {vehicles.map(({ plate, fleet, type, model, status }) => (
            <TableRow>
              <TableCell>{plate}</TableCell>
              <TableCell>{fleet}</TableCell>
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
