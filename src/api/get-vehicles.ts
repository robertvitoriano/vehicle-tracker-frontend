import { api } from "@/lib/axios";

type VehicleType = 'vehicle' | 'implement';
type VehicleStatus = 'active';

export interface Vehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: VehicleType;
  model: string;
  nameOwner: string;
  status: VehicleStatus;
  createdAt: string;
}

export interface LocationVehicle {
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


export type VehicleFilters = {
  type: "tracked" | "others",
  page: number
  perPage?: number
}
type VehiclesFetchResponse = {
  content:{
    vehicles: Vehicle[];
    locationVehicles: LocationVehicle[];
    page: number
    perPage: string
    totalPages:number
  }
  message:string,
  statusCode:string
}
export const getVehiclesQueryKey = "get-vehicles"

export async function getVehicles(params:VehicleFilters): Promise<VehiclesFetchResponse> {
  const response = await api.get<VehiclesFetchResponse>("recruitment/vehicles/list-with-paginate",{
    params
  });
  
  return response.data;
}
