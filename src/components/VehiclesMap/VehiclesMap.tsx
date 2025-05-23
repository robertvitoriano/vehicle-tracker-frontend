import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import { env } from "../../env";
import { LocationVehicle } from "@/api/get-vehicles";
import greenVehicleMarkerIcon from "./../../assets/green-vehicle-marker-icon.svg";
import redVehicleMarkerIcon from "./../../assets/red-vehicle-marker-icon.svg";
import { VehicleInfo } from "../VehiclesInfo/VehicleInfo";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
};

type Props = {
  trackedVehicles: LocationVehicle[];
};

export const VehiclesMap = ({ trackedVehicles }: Props) => {
  const [selectedVehicle, setSelectedVehicle] = useState<LocationVehicle | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(5);
  const [latitudeOffset, setLatitudeOffset] = useState(8);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (trackedVehicles[0]) {
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

  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      if (newZoom !== null) {
        setZoom(newZoom);
        calculateLatitudeOffset(newZoom);
      }
    }
  };
  function calculateLatitudeOffset(newZoom: number) {
    const zoomToKMap: { [key: number]: number } = {
      1:95,
      2:120,
      3:90,
      4:60,
      5: 40,
      6: 22,
      7: 13,
      8: 8,
      9: 4,
      10: 2.2,
      11: 1.4,
      12: 0.7,
      13: 0.4,
      14: 0.2,
      15: 0.11,
      16: 0.06,
      17: 0.03,
      18: 0.018,
      19: 0.009,
      20: 0.0045,
      21: 0.0025,
      22: 0.0012,
    };
  
    const k = zoomToKMap[newZoom] ?? 0;
    
    setLatitudeOffset(k / newZoom);
  }
  
  return (
    <div className="flex flex-col h-[40vh] p-4 bg-primary border border-accent rounded-lg gap-2 md:h-[70vh]">
      <h1 className="font-poppins text-white font-semibold">
        Mapa rastreador
      </h1>
      <LoadScript googleMapsApiKey={env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={(map) => {
            mapRef.current = map;
            return;
          }}
          onZoomChanged={handleZoomChanged}
        >
          {trackedVehicles.map((vehicle, index) => {
            if(vehicle){
              const { lat, lng, ignition } = vehicle;
              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  icon={{ url: getMarkerBasedOnVehicleStatus(ignition) }}
                  onClick={() => setSelectedVehicle(vehicle)}
                />
              );
            }
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
