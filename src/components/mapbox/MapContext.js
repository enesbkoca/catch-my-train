import React, {createContext, useEffect, useState} from 'react';
import getStations from "../../utils/fetchStations";
import {getColorByFriendId} from "../../utils/helperFunctions";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {

    const [markers, setMarkers] = useState([]);
    const [stations, setStations] = useState([]);
    const [polylines, setPolylines] = useState([]);

    useEffect(() => {
        const fetchStations = async () => {
            const stationsData = await getStations();
            console.log({message: "Received results from getStations", result: stationsData})

            await new Promise(resolve => setTimeout(resolve, 2000));

            setStations(stationsData);
        };

        fetchStations();
    }, []);

    useEffect(() => {
        console.log(`Updated stations state:`, stations);
    }, [stations]);

    const removeAllMapArtifacts = () => {
        setPolylines([]);
        setMarkers([]);
    }

    const addPolyline = (positions, color = 'blue') => {
        setPolylines(prevPolylines => [
            ...prevPolylines,
            { positions, color }
        ]);
    };

    const addMarker = (newMarker, markerColor=null) => {
        const color = markerColor === null ? getColorByFriendId(newMarker.friend_id) : markerColor;
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
        <MapContext.Provider value={{ markers, setMarkers, addMarker, removeMarker, updateMarker, stations, polylines, addPolyline, removeAllMapArtifacts }}>
            {children}
        </MapContext.Provider>
    );
};