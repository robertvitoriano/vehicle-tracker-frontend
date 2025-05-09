import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  InfoWindow,
  Marker,
} from "@vis.gl/react-google-maps";
import { env } from "./../../../env";
import { LocationVehicle } from "@/api/get-vehicles";
import greenVehicleMarkerIcon from "./../../assets/green-vehicle-marker-icon.svg";
import redVehicleMarkerIcon from "./../../assets/red-vehicle-marker-icon.svg";
import { VehicleInfo } from "./VehicleInfo";


type Props = {
  trackedVehicles: LocationVehicle[];
};
export const CarsMap = ({ trackedVehicles }: Props) => {
  const [selectedVehicle, setSelectedVehicle] = useState<LocationVehicle | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (trackedVehicles.length > 0) {
      const { lat, lng } = trackedVehicles[0];
      setCenter({ lat, lng });
    }
  }, [trackedVehicles]);
  function getMarkerBasedOnVehicleStatus(status: string) {
    const ignitionStatuses = {
      Ligado: greenVehicleMarkerIcon,
      Desligado: redVehicleMarkerIcon,
    };
    return ignitionStatuses[status];
  }
  return (
    <APIProvider apiKey={env.VITE_GOOGLE_API_URL}>
      <div className="flex flex-col p-4 bg-accent rounded-lg gap-2">
        <h1 className="font-poppins text-white font-semibold">Mapa rastreador</h1>
        {center && (
          <Map
            defaultCenter={center}
            defaultZoom={4}
            style={{ height: "300px", width: "100%", borderRadius: "10px" }}
            disableDefaultUI
            mapId={env.VITE_MAP_ID}
          >
            {trackedVehicles.map((vehicle, index) => {
              const { lat, lng, ignition } = vehicle;

              return (
                <div key={index}>
                  <Marker
                    position={{ lat, lng }}
                    onClick={() => setSelectedVehicle(vehicle)}
                    icon={{
                      url: getMarkerBasedOnVehicleStatus(ignition),
                    }}
                  />
                </div>
              );
            })}
            {selectedVehicle && (
              <InfoWindow onClose={() => setSelectedVehicle(null)} position={selectedVehicle}>
                <VehicleInfo vehicle={selectedVehicle} />
              </InfoWindow>
            )}
          </Map>
        )}
      </div>
    </APIProvider>
  );
};
