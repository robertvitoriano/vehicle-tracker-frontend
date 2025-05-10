import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import { env } from "../../env";
import { LocationVehicle } from "@/api/get-vehicles";
import greenVehicleMarkerIcon from "./../../assets/green-vehicle-marker-icon.svg";
import redVehicleMarkerIcon from "./../../assets/red-vehicle-marker-icon.svg";
import { VehicleInfo } from "./VehicleInfo";

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
    let k = 5;
    if (newZoom <= 5) {
      k = 40;
    } else if (newZoom >= 5 && newZoom < 7) {
      k = 25;
    } else if (newZoom == 7) {
      k = 15;
    } else if (newZoom == 8) {
      k = newZoom;
    } else if (newZoom > 8 && newZoom < 10) {
      k = 5;
    } else if (newZoom == 10) {
      k = 2.2;
    } else if (newZoom == 11) {
      k = 1.4;
    } else if (newZoom == 12 ) {
      k = 0.7;
    }else if (newZoom == 13 ) {
      k = 0.4;
    } else if (newZoom == 14 ) {
      k = 0.2;
    } else if (newZoom == 14 ) {
      k = 0.2;
    } else if (newZoom == 15 ) {
      k = 0.11;
    } else if (newZoom == 16 ) {
      k = 0.06;
    } else if (newZoom == 17 ) {
      k = 0.03;
    } else if (newZoom == 18 ) {
      k = 0.018;
    } else if (newZoom == 19 ) {
      k = 0.009;
    } else if (newZoom == 20 ) {
      k = 0.0045;
    } else if (newZoom == 21 ) {
      k = 0.0025;
    } else if (newZoom == 22 ) {
      k = 0.0012;
    }
    
    
    
    
    setLatitudeOffset(k / newZoom);
  }
  console.log({ zoom });
  return (
    <div className="flex flex-col h-[40vh] p-4 bg-primary border border-accent rounded-lg gap-2 md:h-[70vh]">
      <h1 className="font-poppins text-white font-semibold">
        Mapa rastreador {zoom} latitude Offset:{latitudeOffset}
      </h1>
      <LoadScript googleMapsApiKey={env.VITE_GOOGLE_API_URL}>
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
