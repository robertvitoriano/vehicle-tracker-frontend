import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import { env } from '../../env';
import { LocationVehicle } from "@/api/get-vehicles";
import greenVehicleMarkerIcon from './../../assets/green-vehicle-marker-icon.svg'
import redVehicleMarkerIcon from './../../assets/red-vehicle-marker-icon.svg'
import { VehicleInfo } from "./VehicleInfo";

const containerStyle = {
  width: '100%',
  height: '40vh',
  borderRadius:"10px"
};

const customMapStyle = [];

type Props = {
  trackedVehicles: LocationVehicle[]
};

export const VehiclesMap = ({ trackedVehicles }: Props) => {
  const [selectedVehicle, setSelectedVehicle] = useState<LocationVehicle | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(5);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (trackedVehicles.length > 0) {
      const { lat, lng } = trackedVehicles[0];
      setCenter({ lat, lng });
    }
  }, [trackedVehicles]);

  function getMarkerBasedOnVehicleStatus(status: string) {
    const ignitionStatuses = {
      "Ligado": greenVehicleMarkerIcon,
      "Desligado": redVehicleMarkerIcon
    };
    return ignitionStatuses[status];
  }

  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      if (newZoom !== null) {
        setZoom(newZoom);
      }
    }
  };

  const latitudeOffset = zoom <= 5 ? 8 : 2
  
  return (
    <div className="flex flex-col p-4 bg-primary border border-accent rounded-lg gap-2">
      <h1 className="font-poppins text-white font-semibold">Mapa rastreador</h1>
      <LoadScript googleMapsApiKey={env.VITE_GOOGLE_API_URL}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{ styles: customMapStyle }}
          onLoad={(map) => {
            mapRef.current = map;
            return;
          }}          
          mapTypeId={env.VITE_MAP_ID}
          onZoomChanged={handleZoomChanged} 
        >
          {trackedVehicles.map((vehicle, index) => {
            const { lat, lng, ignition } = vehicle;
            return (
              <Marker
                key={index}
                position={{ lat, lng }}
                icon={{ url: getMarkerBasedOnVehicleStatus(ignition) }}
                onClick={() => setSelectedVehicle(vehicle)}
              />
            );
          })}

          {selectedVehicle && (
            <OverlayView
              position={{ lat: selectedVehicle.lat + latitudeOffset, lng: selectedVehicle.lng }}
              mapPaneName="floatPane"
            >
              <VehicleInfo vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
