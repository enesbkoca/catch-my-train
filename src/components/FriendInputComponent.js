import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContext } from './MapContext';
import {
    getOneHourAheadTime,
    updateFriendInputMarkers,
    handleFriendChange,
    renderStationOptions,
    removeFriend,
    addFriend,
    handleSubmit,
    handleMeetingChange, adjustToLocalTime
} from "../utils/helperFunctions";

const FriendInputComponent = () => {
    const navigate = useNavigate();
    const { markers, addMarker, removeMarker, updateMarker, stations } = useContext(MapContext);
    const [friends, setFriends] = useState([
        { name: 'Jack', station: 'Amsterdam Centraal' , friend_id: 0},
        { name: 'Alice', station: 'Rotterdam Centraal', friend_id: 1}
    ]);
    const [meetingOptions, setMeetingOptions] = useState({
        datetime: getOneHourAheadTime(),
        duration: '03:00'
    });

    useEffect(() => {
        updateFriendInputMarkers(friends, stations, markers, addMarker, removeMarker, updateMarker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friends, stations]);

    useEffect(() => {
        console.log("Markers have been updated: ", markers);
    }, [markers]);

    return (
        <div className="friend-input">
            {friends.map((friend, index) => (
                <div key={index} className="row">
                    <input
                        id="friend-name"
                        type="text"
                        placeholder="Name"
                        value={friend.name}
                        onChange={(e) => handleFriendChange(index, 'name', e.target.value, friends, setFriends)}
                    />
                    <select
                        id="starting-station"
                        value={friend.station}
                        onChange={(e) => {
                            handleFriendChange(index, 'station', e.target.value, friends, setFriends);
                        }}
                    >
                        <option value="">Starting Station</option>
                        {renderStationOptions(stations)}
                    </select>
                    <button className="remove-button" onClick={() => removeFriend(index, friends, setFriends)}
                            disabled={friends.length < 3}>
                        &ndash;
                    </button>
                </div>
            ))}

            <div className="row label-row">
                <div>
                    <label htmlFor="meeting-date">Date & Time</label>
                </div>

                <div>
                    <label htmlFor="meeting-duration">Duration</label>
                </div>
            </div>

            <div className="row meeting-options">
                <input
                    type="datetime-local"
                    id="meeting-datetime"
                    value={adjustToLocalTime(meetingOptions.datetime)}
                    onChange={(e) => handleMeetingChange("datetime", new Date(e.target.value), meetingOptions, setMeetingOptions)}
                />
                <input
                    type="time"
                    id="meeting-duration"
                    value={meetingOptions.duration}
                    onChange={(e) => handleMeetingChange("duration", e.target.value, meetingOptions, setMeetingOptions)}
                />
                <button className="add-button" onClick={() => addFriend(friends, setFriends, addMarker)} disabled={friends.length >= 5}>
                    +
                </button>
            </div>

            <div className={"row"}>
                <button className={"submit-button"} onClick={() => handleSubmit(friends, meetingOptions, navigate)}>
                    Plan the perfect journey
                </button>
            </div>
        </div>
    );
};

export default FriendInputComponent;