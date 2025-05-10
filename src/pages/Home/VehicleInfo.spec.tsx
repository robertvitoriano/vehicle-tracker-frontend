import { render, screen } from "@testing-library/react";
import { VehicleInfo } from "./VehicleInfo";
import { LocationVehicle } from "@/api/get-vehicles";


const mockVehicle:LocationVehicle = {
  id: "1",
  plate: "ABC1234",
  fleet: "Fleet A",
  lat: 10,
  lng: 20,
  createdAt: "2025-05-10",
  equipmentId:"", 
  name:"", 
  ignition:"Ligado"
};

describe("VehicleInfo Component", () => {
  it("should render vehicle information", () => {

    render(<VehicleInfo vehicle={mockVehicle} />);

    expect(screen.getByText("Placa ABC1234")).toBeInTheDocument();
    expect(screen.getByText("Frota Fleet A")).toBeInTheDocument();
    expect(screen.getByText("2025-05-10")).toBeInTheDocument();
    expect(screen.getByText("10, 20")).toBeInTheDocument();
  });
});
