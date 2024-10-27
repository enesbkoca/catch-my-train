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

export const getCoordinates = (station_name, stations) => {
    // Find the station by name
    const station = stations.find(station => station.name === station_name);

    // Check if the station is found
    if (station) {
        console.log("Found station with: " + JSON.stringify(station));
        return station.coordinates;
    } else {
        // Log a message if default coordinates are used
        console.warn(`Station "${station_name}" not found. Using default coordinates:`, coordinatesNetherlands);
        return coordinatesNetherlands;
    }
};

// func to handle adding new rows
export const addFriend = (prevFriends, setFriends,) => {
    const newIndex = prevFriends.reduce((maxId, friend) => Math.max(maxId, friend.friend_id), 0) + 1;
    setFriends(prevFriends => [...prevFriends, {friend_id: newIndex, name: '', station: ''}]);
};

// func to remove row
export const removeFriend = (index, prevFriends, setFriends,) => {
    setFriends(prevFriends => prevFriends.filter((_, i) => i !== index));
};

// func to handle input changes
export const handleFriendChange = (index, field, value, friends, setFriends) => {
    const newFriends = [...friends];
    newFriends[index][field] = value;
    setFriends(newFriends);
};


export const handleMeetingChange = (field, value, prevOptions, setMeetingOptions) => {
    setMeetingOptions(prevOptions => ({
        ...prevOptions,
        [field]: value
    }));
}

export const getDurationDifference = (meetingOptions) => {
    const [hoursPref, minutesPref] = meetingOptions.duration.split(":").map(Number);
    const [hoursActual, minutesActual] = meetingOptions.actual_duration.split(":").map(Number);
    const preferredMinutes = hoursPref * 60 + minutesPref;
    const actualMinutes = hoursActual * 60 + minutesActual;
    const diff = actualMinutes - preferredMinutes;

    const diffStr = (diff >= 0) ? "+" : "";
    return diffStr + diff.toString();
};

export const updateFriendInputMarkers = (friends, stations, markers, addMarker, removeMarker, updateMarker) => {
    const friendIds = friends.map(friend => friend.friend_id);


    friends.forEach(friend => {
        // Find all existing markers by friend_id
        const existingMarkers = markers.filter(marker => marker.friend_id === friend.friend_id);
        const position = getCoordinates(friend.station, stations);

        // If there are existing markers, update all of them
        if (existingMarkers.length > 0) {
            existingMarkers.forEach(() => {
                // Update each marker with the new position
                updateMarker({
                    friend_id: friend.friend_id,
                    station_name: friend.station,
                    position: position
                });
            });
        } else {
            // If no existing marker found, add a new marker
            addMarker({
                friend_id: friend.friend_id,
                station_name: friend.station,
                position: position
            });
        }
    });

    // Remove markers which don't have a friend
    markers.forEach(marker => {
            if (!friendIds.includes(marker.friend_id)) {
                removeMarker(marker.friend_id);
            }
        }
    )
};

export const getColorByFriendId = (friend_id, background = false) => {
    const backgroundColors = {
        0: "#E1C6FF", // lighter violet
        1: "#A8E8B2", // lighter green
        2: "#A1D4F7", // lighter blue
        3: "#C2C6D1", // lighter grey
        4: "#F9B2B2", // lighter red
    };
    const markerColors = ['violet', 'green', 'blue', 'grey', 'red'];

    const markerColor = markerColors[friend_id % markerColors.length];
    const backgroundColor = backgroundColors[friend_id % markerColors.length];

    return background ? backgroundColor : markerColor;
};

export const updateJourneyMarkers = (journeyResult, stations, addMarker, markers, addPolyline, removeAllMapArtifacts) => {
    // Clear all existing map artifacts, including markers and polylines
    removeAllMapArtifacts();


    // Add marker for meeting point
    const meetingPosition = getCoordinates(journeyResult.meetingOptions.meeting_station, stations);
    addMarker({
        station_name: journeyResult.meetingOptions.meeting_station,
        position: meetingPosition
    }, "gold");

    journeyResult.friends.forEach(friend => {
        const friendPositions = []; // Track each friend’s journey positions

        friend.trainRide.forEach(ride => {
            const position = getCoordinates(ride.station_departure, stations);

            // Add marker for each station
            addMarker({
                friend_id: friend.friend_id,
                station_name: ride.station_departure,
                position: position
            });

            // Store position for drawing polyline
            friendPositions.push(position);
        });

        friendPositions.push(meetingPosition);
        // Add polyline for the friend’s journey using addPolyline
        addPolyline(friendPositions, getColorByFriendId(friend.friend_id));
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