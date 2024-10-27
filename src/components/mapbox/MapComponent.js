import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { MapContext } from './MapContext';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-curve';
import 'leaflet-polylinedecorator';


import {createCustomIcon} from "../../utils/helperFunctions";
import {coordinatesNetherlands} from "../../assets/constants";

const CurvedPolyline = ({ positions, color }) => {
    const map = useMap();

    useEffect(() => {
        if (positions.length < 2) return;

        const pathCommands = [];
        for (let i = 0; i < positions.length - 1; i++) {
            const start = positions[i];
            const end = positions[i + 1];
            const controlPoint = [
                (start[0] + end[0]) / 2 + 0.05,
                (start[1] + end[1]) / 2 - 0.05,
            ];

            pathCommands.push('M', start, 'Q', controlPoint, end);
        }

        const curve = L.curve(pathCommands, { color: color || 'blue', weight: 4, dashArray: '5, 10' });
        curve.addTo(map);

        return () => map.removeLayer(curve);
    }, [map, positions, color]);

    return null;
};

const MapComponent = () => {
    const { markers, polylines } = useContext(MapContext);

    return (
        <MapContainer center={coordinatesNetherlands} zoom={8} className="map-container" zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {markers.map((marker, index) => (
                <Marker
                    key={`marker-${index}`}
                    position={marker.position}
                    icon={createCustomIcon(marker.color)}
                >
                </Marker>
            ))}

            {/* Render curved polylines with dash pattern */}
            {polylines.map((polyline, index) => (
                <CurvedPolyline
                    key={`curved-polyline-${index}`}
                    positions={polyline.positions}
                    color={polyline.color}
                />
            ))}
        </MapContainer>
    );
};

export default MapComponent;