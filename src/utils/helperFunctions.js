import computeJourney from "./computeJourney";
import React from "react";
import {coordinatesNetherlands} from "../assets/constants";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// func to create a custom marker icon based on color
export const createCustomIcon = (color) => {
    return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowSize: [41, 41] // size of the shadow
    });
};

export const getTodaysDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getOneHourAheadTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`; // Format to HH:MM
};


// func to handle adding new rows
export const addFriend = (prevFriends, setFriends, addMarker) => {
    setFriends(prevFriends => [...prevFriends, {name: '', station: ''}]);
    addMarker({ position: coordinatesNetherlands });
};

// func to remove row
export const removeFriend = (index, prevFriends, setFriends, removeMarker) => {
    setFriends(prevFriends => prevFriends.filter((_, i) => i !== index));
    removeMarker(index);
};


export const handleMarkerChange = (index, coordinates, updateMarker) => {
    const newMarker = {
        position: coordinates, // use the provided coordinates
    };
    updateMarker(index, newMarker);
};

// func to handle input changes
export const handleFriendChange = (index, field, value, friends, setFriends, stations, updateMarker) => {
    const newFriends = [...friends];
    newFriends[index][field] = value;
    setFriends(newFriends);

    // update marker if station was changes
    if (field === 'station') {
        const selectedStation = stations.find(station => station.name === value);
        if (selectedStation) {
            handleMarkerChange(index, selectedStation.coordinates, updateMarker);
        }
    }
};


export const handleMeetingChange = (field, value, prevOptions, setMeetingOptions) => {
    setMeetingOptions(prevOptions => ({
        ...prevOptions,
        [field]: value
    }));
}

export const handleSubmit = (friends, meetingOptions) => {
    computeJourney(friends, meetingOptions);

    // navigate('/journey')
}

export const updateMarkers = (friends, stations, markers, updateMarker) => {
    friends.forEach((friend, index) => {
        const station = stations.find(station => station.name === friend.station);
        const newMarker = station ? station.coordinates : coordinatesNetherlands;

        // Only update if the coordinates are different
        if (markers[index]?.position.toString() !== newMarker.toString()) {
            updateMarker(index, { position: newMarker });
        }
    });
};

export const renderStationOptions = (stations) => {
    return stations.map((station, optIndex) => (
        <option key={optIndex} value={station.name}>
            {station.name}
        </option>
    ));
}