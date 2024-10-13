import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { MapContext } from './MapContext';
import 'leaflet/dist/leaflet.css';
import {coordinatesNetherlands} from "../assets/constants";
import {createCustomIcon} from "../utils/helperFunctions";

const MapComponent = () => {
    const { markers } = useContext(MapContext);

    return (
        <MapContainer center={coordinatesNetherlands} zoom={8} className={"map-container"} zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    icon={createCustomIcon(marker.color)}
                ></Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;