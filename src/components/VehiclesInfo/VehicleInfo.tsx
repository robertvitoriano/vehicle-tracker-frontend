import { LocationVehicle } from "@/api/get-vehicles";
import { X } from "lucide-react";

type Props = {
  vehicle: LocationVehicle;
  onClose?: () => void;
};
export const VehicleInfo = ({ vehicle, onClose }: Props) => {
  const { createdAt, plate, fleet, lat, lng } = vehicle;

  return (
    <div className="relative flex flex-col items-center">
      <div className="bg-background text-white font-poppins w-[166px] rounded-md shadow-lg relative z-10">
        <div className="flex justify-end px-2 py-2 absolute top-0 right-0">
          <X onClick={onClose} className="text-white cursor-pointer" size={12} />
        </div>
        <div className="flex flex-col py-6 items-center px-2 pt-8">
          <span>Placa {plate}</span>
          <span>Frota {fleet}</span>
          <span>{createdAt}</span>
          <div className="border-b-2 border-white mt-1">
            <a
              href={`https://www.google.com/maps?q=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-active underline"
            >
              {lat}, {lng}
            </a>
          </div>
        </div>
      </div>

      <div className="w-0 h-0 border-l-8 border-r-8 border-t-[10px] border-l-transparent border-r-transparent border-t-background z-0" />
    </div>
  );
};
