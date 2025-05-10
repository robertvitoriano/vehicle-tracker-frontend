import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VehiclesMap } from "./VehiclesMap";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getVehicles,
  getVehiclesQueryKey,
  LocationVehicle,
  Vehicle,
} from "@/api/get-vehicles";
import { useEffect, useState } from "react";
import { VehicleTable } from "./VehicleTable";

export function Home() {
  const getNextPage  = (lastPage) => {
    const currentPage = lastPage.content.page;
    const totalPages = lastPage.content.totalPages;
    return currentPage < totalPages ? currentPage + 1 : undefined;
  }
  
  const queryFunction = ({ pageParam = 1 }) => getVehicles({ type: "tracked", page: pageParam, perPage: 20 })
  
  const { data:vehiclesResponse, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [getVehiclesQueryKey, { type: "tracked", perPage: 20 }],
    queryFn:queryFunction ,
    initialPageParam: 1,
    getNextPageParam: getNextPage,
    
  });

  const [trackedVehicles, setTrackedVehicles] = useState<LocationVehicle[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (vehiclesResponse) {
      const allTracked = vehiclesResponse.pages.flatMap((p) => p.content.locationVehicles);
      const allVehicles = vehiclesResponse.pages.flatMap((p) => p.content.vehicles);
      setTrackedVehicles(allTracked);
      setVehicles(allVehicles);
    }
  }, [vehiclesResponse]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    const pageContainer = document.querySelector('.page-container')
    pageContainer.addEventListener("scroll", handleScroll);
    return () => pageContainer.removeEventListener("scroll", handleScroll);
    
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-accent border-b-2">
        <div className="flex  py-8 gap-32 items-center">
          <h2 className="text-white font-poppins">Lista</h2>
          <div>
            <RadioGroup defaultValue="vehicles" className="flex text-white">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="tracked font-poppins">Rastreados</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vehicles" id="r2" />
                <Label htmlFor="others font-poppins">Outros</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex gap-4">
          <Input
            className="border-muted h-10 w-[279px] font-poppins text-white"
            placeholder="Buscar por placa ou frota"
          />
          <Button title="Buscar" variant="default" className="px-16 font-poppins">
            Novo
          </Button>
        </div>
      </div>
      <VehiclesMap trackedVehicles={trackedVehicles} />
      <VehicleTable vehicles={vehicles} />
    </div>
  );
}
