import { LocationVehicle } from "@/api/get-vehicles";
import { X } from "lucide-react";

type Props = {
  vehicle: LocationVehicle;
  onClose: () => void;
};
export const VehicleInfo = ({ vehicle, onClose }: Props) => {
  const { createdAt, plate, fleet, lat, lng } = vehicle;
  return (
    <div className="bg-background text-white font-poppins flex flex-col w-[166px] relative ">
      <div className="w-full flex  justify-end px-2 py-2 absolute">
        <X onClick={onClose} className="w-fit text-white " size={12}/>
      </div>
      <div className="bg-background text-white font-poppins flex flex-col py-4 items-center ">
        <span>Placa {plate}</span>
        <span>Frota {fleet}</span>
        <span>{createdAt}</span>
        <div className="border-b-2 border-white">
          <span>
            {lat},{lng}
          </span>
        </div>
      </div>
    </div>
  );
};
