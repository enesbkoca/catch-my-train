import { MapContainer, TileLayer } from 'react-leaflet';

const MapComponent = () => {
    return (
        <MapContainer center={[52.3676, 4.9041]} zoom={8} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
};

export default MapComponent;