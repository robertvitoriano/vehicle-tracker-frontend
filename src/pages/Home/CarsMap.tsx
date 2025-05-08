import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { env } from './../../../env';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: -23.55052,
  lng: -46.633308,
};

const customMapStyle = []; 

const points = [
  { lat: -23.55052, lng: -46.633308 },
  { lat: -23.56, lng: -46.64 },
];

export const CarsMap = () => {
  return (
    <LoadScript googleMapsApiKey={env.VITE_GOOGLE_API_URL}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ styles: customMapStyle }}

      >
        {points.map((point, index) => (
          <Marker
            key={index}
            position={point}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
