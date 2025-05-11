import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VehiclesMap } from "../../components/VehiclesMap/VehiclesMap";
import { VehicleTable } from "../../components/VehiclesTable/VehicleTable";
import { useVehicleData } from "@/lib/hooks/useVehicleData";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";

export function Home() {
  const [vehicleType, setVehicleType] = useState<"tracked" | "others">("tracked");

  const { trackedVehicles, vehicles, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useVehicleData(vehicleType);

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-between border-accent border-b-2 pb-8 md:pb-0 md:flex-row ">
        <div className="flex py-8 gap-8 md:flex-1 md:gap-32 items-center">
          <h2 className="text-white font-poppins">Lista</h2>
          <div>
            <RadioGroup
              defaultValue="tracked"
              className="flex text-white"
              onValueChange={(value) => setVehicleType(value as "tracked" | "others")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tracked" id="tracked" />
                <Label htmlFor="tracked">Rastreados</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="others" id="others" />
                <Label htmlFor="others">Outros</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex gap-4 flex-col md:flex-row md:ml-8">
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
