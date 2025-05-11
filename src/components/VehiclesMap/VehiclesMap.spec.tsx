import { render, screen } from "@testing-library/react";
import { VehiclesMap } from "./VehiclesMap";
import { LocationVehicle } from "@/api/get-vehicles";

jest.mock("@react-google-maps/api", () => ({
  GoogleMap: ({ children }: any) => <div data-testid="google-map">{children}</div>,
  LoadScript: ({ children }: any) => <div>{children}</div>,
  Marker: ({ position }: any) => <div data-testid="marker">{JSON.stringify(position)}</div>,
  OverlayView: ({ children }: any) => <div data-testid="overlay-view">{children}</div>,
}));

const mockTrackedVehicles: LocationVehicle[] = [
  { id: "1", lat: 10, lng: 20, ignition: "Ligado",fleet:"", equipmentId:"", name:"", plate:"", createdAt:"" },
  { id: "2", lat: 30, lng: 40, ignition: "Desligado", fleet:"", equipmentId:"", name:"", plate:"", createdAt:""  },
];

describe("VehiclesMap Component", () => {
  it("should render the map and markers", () => {
    render(<VehiclesMap trackedVehicles={mockTrackedVehicles} />);

    expect(screen.getByTestId("google-map")).toBeInTheDocument();

    const markers = screen.getAllByTestId("marker");
    
    expect(markers).toHaveLength(2);
    expect(markers[0]).toHaveTextContent(JSON.stringify({ lat: 10, lng: 20 }));
    expect(markers[1]).toHaveTextContent(JSON.stringify({ lat: 30, lng: 40 }));
  });
});
