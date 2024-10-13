import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { MapContext } from './MapContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {coordinatesNetherlands} from "../assets/constants";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
    const { markers } = useContext(MapContext);

    return (
        <MapContainer center={coordinatesNetherlands} zoom={8} className={"map-container"} zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <Marker key={index} position={marker.position}></Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;