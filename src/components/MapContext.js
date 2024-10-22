import React, { createContext, useState } from 'react';
import {coordinatesNetherlands} from "../assets/constants";

export const MapContext = createContext();

export const MapProvider = ({ children, stations }) => {
    const markerColors = ['violet', 'green', 'blue', 'grey', 'red'];

    const [markers, setMarkers] = useState([]);

    const getColorByFriendId = (friend_id) => {
        return markerColors[friend_id % markerColors.length]; // Use modulo to loop through available colors
    };

    const addMarker = (newMarker) => {
        const color = getColorByFriendId(newMarker.friend_id);
        const station = stations.find(station => station.name === newMarker.station);
        const position = station ? station.coordinates : coordinatesNetherlands;

        setMarkers(prevMarkers => [...prevMarkers, { ...newMarker, color, position }]);
    };

    // Remove marker by friend_id
    const removeMarker = (friend_id) => {
        setMarkers(prevMarkers => prevMarkers.filter(marker => marker.friend_id !== friend_id));
    };

    // Update an existing marker by friend_id
    const updateMarker = (updatedMarker) => {
        setMarkers(prevMarkers =>
            prevMarkers.map(marker =>
                marker.friend_id === updatedMarker.friend_id
                    ? { ...updatedMarker, color: getColorByFriendId(updatedMarker.friend_id) }
                    : marker
            )
        );
    };

    return (
        <MapContext.Provider value={{ markers, setMarkers, addMarker, removeMarker, updateMarker, stations }}>
            {children}
        </MapContext.Provider>
    );
};