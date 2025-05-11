import { render, screen } from "@testing-library/react";
import { VehicleTable } from "./VehicleTable";
import { Vehicle } from "@/api/get-vehicles";

const mockVehicles:Vehicle[] = [
  {
    id: "1",
    plate: "ABC1234",
    fleet: "Fleet A",
    type: "vehicle",
    model: "Model X",
    status: "inactive",
    createdAt:'',
    nameOwner:''
  },
  {
    id: "2",
    plate: "XYZ5678",
    fleet: null,
    type: "implement",
    model: "Model Y",
    status: "active",
    createdAt:'',
    nameOwner:''
  },
];

describe("VehicleTable Component", () => {
  it("should render the table with vehicle data", () => {
    render(<VehicleTable vehicles={mockVehicles} />);

    expect(screen.getByText("Placa")).toBeInTheDocument();
    expect(screen.getByText("Frota")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Modelo")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    expect(screen.getByText("ABC1234")).toBeInTheDocument();
    expect(screen.getByText("Fleet A")).toBeInTheDocument();
    expect(screen.getByText("Motor")).toBeInTheDocument();
    expect(screen.getByText("Model X")).toBeInTheDocument();
    expect(screen.getByText("Ativo")).toBeInTheDocument();

    expect(screen.getByText("Não informada")).toBeInTheDocument();
  });
});
