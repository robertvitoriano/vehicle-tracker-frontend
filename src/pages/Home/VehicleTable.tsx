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
export const VehicleTable = ({ vehicles }: Props) => {
  return (
    <div className="bg-primary border border-accent rounded-lg p-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Placa</TableHead>
            <TableHead>Frota</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Status</TableHead>
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
