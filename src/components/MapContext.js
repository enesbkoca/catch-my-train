import React, { createContext, useState, useCallback } from 'react';

export const MapContext = createContext();
export const MapProvider = ({ children }) => {
    const [markers, setMarkers] = useState([
        { position: [52.379189, 4.899431] },
        { position: [51.9225, 4.47917] }
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