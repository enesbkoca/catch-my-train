import React, { createContext, useState } from 'react';
import {coordinatesNetherlands} from "../assets/constants";

export const MapContext = createContext();
export const MapProvider = ({ children }) => {
    const markerColors = ['violet', 'green', 'blue', 'grey', 'red'];

    const [markers, setMarkers] = useState([
        { position: coordinatesNetherlands, color: markerColors[0]},
        { position: coordinatesNetherlands, color: markerColors[1]}
    ]);

    const addMarker = (marker) => {
        setMarkers([...markers, { ...marker, color: markerColors[markers.length] }]);
    };

    const removeMarker = (index) => {
        setMarkers(markers => {
            const updatedMarkers = markers.filter((_, i) => i !== index);

            // reassign colors to the remaining markers
            return updatedMarkers.map((marker, i) => ({ ...marker, color: markerColors[i] }));
        });
    };

    const updateMarker = (index, newMarker) => {
        setMarkers(currentMarkers =>
            currentMarkers.map((marker, i) => (i === index ? { ...newMarker, color: markerColors[i] } : marker))
        );
    };

    return (
        <MapContext.Provider value={{ markers, addMarker, removeMarker, updateMarker }}>
            {children}
        </MapContext.Provider>
    );
};