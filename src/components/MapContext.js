import React, {createContext, useEffect, useState} from 'react';
import GetStations from "../utils/fetchStations";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const markerColors = ['violet', 'green', 'blue', 'grey', 'red'];
    const [markers, setMarkers] = useState([]);
    const [stations, setStations] = useState([])

    useEffect(() => {
        const fetchStations = async () => {
            const stationsData = await GetStations();
            setStations(stationsData);
        };

        fetchStations();
    }, []);

    const getColorByFriendId = (friend_id) => {
        return markerColors[friend_id % markerColors.length]; // Use modulo to loop through available colors
    };

    const addMarker = (newMarker) => {
        const color = getColorByFriendId(newMarker.friend_id);

        setMarkers(prevMarkers => [...prevMarkers, { ...newMarker, color }]);
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