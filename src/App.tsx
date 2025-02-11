import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position: [number, number] = [37.5665, 126.9780]; // 서울 좌표

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false} // 필요에 따라 속성 추가
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>여기는 서울입니다!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
