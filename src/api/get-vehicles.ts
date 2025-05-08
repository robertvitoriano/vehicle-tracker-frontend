import { api } from "@/lib/axios";

type VehicleType = 'vehicle' | 'implement';
type VehicleStatus = 'active';

interface Vehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: VehicleType;
  model: string;
  nameOwner: string;
  status: VehicleStatus;
  createdAt: string;
}

interface LocationVehicle {
  id: string;
  fleet: string;
  equipmentId: string;
  name: string;
  plate: string;
  ignition: 'Ligado' | 'Desligado';
  lat: number;
  lng: number;
  createdAt: string; 
}

interface VehiclesData {
  vehicles: Vehicle[];
  locationVehicles: LocationVehicle[];
}

export type VehicleFilters = {
  type: "tracked" | "others",
  page: number
  perPage?: number
}

export async function getVehicles(params:VehicleFilters): Promise<VehiclesData> {
  const response = await api.get<VehiclesData>("/vehicles/list-with-paginate",{
    params
  });
  console.log(response.data)
  return response.data;
}
