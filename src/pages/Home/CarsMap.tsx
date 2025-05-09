import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { env } from './../../../env';
import { LocationVehicle } from "@/api/get-vehicles";
import greenVehicleMarkerIcon from './../../assets/green-vehicle-marker-icon.svg'
import redVehicleMarkerIcon from './../../assets/red-vehicle-marker-icon.svg'

const containerStyle = {
  width: '100%',
  height: '300px',
};

const customMapStyle = [];


type Props = {
  trackedVehicles:LocationVehicle[]
}
export const CarsMap = ({trackedVehicles}:Props) => {
  
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({lat:0, lng:0})
  
  useEffect(()=>{
    if(trackedVehicles.length > 0){
      const {lat, lng} = trackedVehicles[0]
      setCenter({lat, lng})
    }
  },[trackedVehicles])
  function getMarkerBasedOnVehicleStatus(status:string){
    const ignitionStatuses = {
      "Ligado": greenVehicleMarkerIcon,
      "Desligado": redVehicleMarkerIcon
    }
    return ignitionStatuses[status]
    
  }
  return (
    <LoadScript googleMapsApiKey={env.VITE_GOOGLE_API_URL}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={{ styles: customMapStyle }}
      >
        {trackedVehicles.map(({lat,lng, ignition}, index) => (
          <Marker
            key={index}
            position={{lat, lng}}
            icon={{
              url: getMarkerBasedOnVehicleStatus(ignition) ,
            }}
            onClick={() => setSelected({lat, lng})}
          />
        ))}

        {selected && (
          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)}
          >
            <div>INFO</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
