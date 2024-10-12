import React, {useState, useContext, useEffect} from 'react';
import { MapContext } from './MapContext';
import {getTodaysDate, getOneHourAheadTime} from "../utils/helperFunctions";

const FriendInputComponent = ({ stations }) => {
    const { markers, addMarker, removeMarker, updateMarker } = useContext(MapContext);
    const [friends, setFriends] = useState([
        { name: 'Jack', station: 'Amsterdam Centraal' },
        { name: '', station: '' }
    ]);
    const [meetingOptions, setMeetingOptions] = useState([{
        date: getTodaysDate(), meeting_time: getOneHourAheadTime(), duration: '03:00'}])

    useEffect(() => {
        const updateMarkers = () => {
            friends.forEach((friend, index) => {
                const station = stations.find(station => station.name === friend.station);
                const newMarker = station ? station.coordinates : [52.3676, 4.9041];

                // Only update if the coordinates are different
                if (markers[index]?.position.toString() !== newMarker.toString()) {
                    updateMarker(index, { position: newMarker });
                }
            });
        };

        updateMarkers();
    }, [friends, stations, markers, updateMarker]);


    // func to handle adding new rows
    const addFriend = () => {
        if (friends.length < 5) {
            setFriends([...friends, {name: '', station: ''}]);
            addMarker({ position: [52.3676, 4.9041]});
        }
    };

    // func to remove row
    const removeFriend = (index) => {
        const newFriends = friends.filter((_, i) => i !== index);
        setFriends(newFriends);
        removeMarker(index);
    };

    // func to handle input changes
    const handleFriendChange = (index, field, value) => {
        const newFriends = [...friends];
        newFriends[index][field] = value;
        setFriends(newFriends);

        // update marker if station was changes
        if (field === 'station') {
            const selectedStation = stations.find(station => station.name === value);
            if (selectedStation) {
                handleMarkerChange(index, selectedStation.coordinates);
            }
        }
    };
    const handleMarkerChange = (index, coordinates) => {
        const newMarker = {
            position: coordinates, // use the provided coordinates
        };
        updateMarker(index, newMarker);
    };

    const handleMeetingChange = (field, value) => {
        const newOptions = [...meetingOptions];
        newOptions[field] = value;
        setMeetingOptions(newOptions);
    }



    return (
        <div className="user-inputs">
            {friends.map((friend, index) => (
                <div key={index} className="row">
                    <input
                        id="friend-name"
                        type="text"
                        placeholder="Name"
                        value={friend.name}
                        onChange={(e) => handleFriendChange(index, 'name', e.target.value)}
                    />
                    <select
                        id="starting-station"
                        value={friend.station}
                        onChange={(e) => {
                            handleFriendChange(index, 'station', e.target.value);
                            handleMarkerChange();
                        }}
                    >
                        <option value="">Starting Station</option>
                        {stations.map((station, optIndex) => (
                            <option key={optIndex} value={station.name}>
                                {station.name}
                            </option>
                        ))}
                    </select>
                    <button className="remove-button" onClick={() => removeFriend(index)}
                            disabled={friends.length < 3}>
                        &ndash;
                    </button>
                </div>
            ))}

                <div className="row">
                    <div className="input-group">
                        <label htmlFor="meeting-date">Date</label>
                        <input
                            type="date"
                            value={meetingOptions.date}
                            onChange={(e) => handleMeetingChange(meetingOptions["date"], e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="meeting-time">Time</label>
                        <input
                            type="time"
                            value={meetingOptions.meeting_time}
                            onChange={(e) => handleMeetingChange(meetingOptions["time"], e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="meeting-duration">Duration</label>
                        <input
                            type="time"
                            value={meetingOptions.duration}
                            onChange={(e) => handleMeetingChange(meetingOptions["duration"], e.target.value)}
                        />
                    </div>
                    <button className="add-button" onClick={addFriend} disabled={friends.length >= 5}>
                        +
                    </button>
                </div>

                <div className="row">
                    <button className="submit-button">
                        Find the perfect train
                    </button>
                </div>

        </div>
            );
            };

            export default FriendInputComponent;