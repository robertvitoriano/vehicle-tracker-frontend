import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VehiclesMap } from "./VehiclesMap";

import { VehicleTable } from "./VehicleTable";
import { useTrackedVehicles } from "@/hooks/useTrackedVehicles";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export function Home() {
  const {
    trackedVehicles,
    vehicles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTrackedVehicles();

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  });
  
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
