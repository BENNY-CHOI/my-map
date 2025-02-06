import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const Map = () => {
  const position: LatLngExpression = [37.5665, 126.978]; // 서울 좌표

  return (
    <MapContainer center={position} zoom={13} style={{ width: "100%", height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>서울 시청</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
