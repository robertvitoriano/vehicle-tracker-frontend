import { LocationVehicle } from "@/api/get-vehicles"

type Props = {
  vehicle:LocationVehicle
}
export const VehicleInfo = ({vehicle}:Props)=>{
  const {createdAt,plate,fleet,lat,lng} = vehicle
  return (
    <div className="bg-background text-white font-poppins flex flex-col p-4 items-center">
      <span>Placa {plate}</span>
      <span>Frota {fleet}</span>
      <span>{createdAt}</span>
      <div className="border-b-2 border-white">
        <span>{lat},{lng}</span>
      </div>
    </div>

  )
}
