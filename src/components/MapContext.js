import React, { createContext, useState } from 'react';
import {coordinatesNetherlands} from "../assets/constants";

export const MapContext = createContext();
export const MapProvider = ({ children }) => {
    const [markers, setMarkers] = useState([
        { position: coordinatesNetherlands },
        { position: coordinatesNetherlands }
    ]);

    const addMarker = (marker) => {
        setMarkers([...markers, marker]);
    };

    const removeMarker = (index) => {
        setMarkers(markers => markers.filter((_, i) => i !== index));
    };

    const updateMarker = (index, newMarker) => {
        setMarkers(currentMarkers =>
            currentMarkers.map((marker, i) => (i === index ? newMarker : marker))
        );
    };

    return (
        <MapContext.Provider value={{ markers, addMarker, removeMarker, updateMarker }}>
            {children}
        </MapContext.Provider>
    );
};