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

export const getOneHourAheadTime = () => {
    const now = new Date(); // Get the current local time
    now.setHours(now.getHours() + 1); // Add one hour to the local time
    return now; // Return the modified date object
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

export const handleSubmit = async (friends, meetingOptions, navigate) => {
    // Await the async computeJourney function
    const journeyResults = await computeJourney(friends, meetingOptions);

    // Navigate to the '/journey' page and pass the journey results
    navigate('/journey', { state: { journeyResults } });
};


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

export const adjustToLocalTime = (utcDate) => {
    const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000)); // Adjust for timezone offset
    return localDate.toISOString().slice(0, 16); // Format to "YYYY-MM-DDTHH:MM"
};