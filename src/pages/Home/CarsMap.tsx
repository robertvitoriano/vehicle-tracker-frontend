import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { env } from './../../../env';
import { LocationVehicle } from "@/api/get-vehicles";

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

  return (
    <LoadScript googleMapsApiKey={env.VITE_GOOGLE_API_URL}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        options={{ styles: customMapStyle }}
      >
        {trackedVehicles.map(({lat,lng}, index) => (
          <Marker
            key={index}
            position={{lat, lng}}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
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
