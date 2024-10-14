import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContext } from './MapContext';
import {
    getOneHourAheadTime,
    updateMarkers,
    handleFriendChange,
    renderStationOptions,
    removeFriend,
    addFriend,
    handleSubmit,
    handleMeetingChange, adjustToLocalTime
} from "../utils/helperFunctions";

const FriendInputComponent = ({ stations }) => {
    const navigate = useNavigate();
    const { markers, addMarker, removeMarker, updateMarker } = useContext(MapContext);
    const [friends, setFriends] = useState([
        { name: 'Jack', station: 'Amsterdam Centraal' },
        { name: '', station: '' }
    ]);
    const [meetingOptions, setMeetingOptions] = useState({
        datetime: getOneHourAheadTime(),
        duration: '03:00'
    });

    useEffect(() => {
        updateMarkers(friends, stations, markers, updateMarker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friends, markers, updateMarker]);

    return (
        <div className="friend-input">
            {friends.map((friend, index) => (
                <div key={index} className="row">
                    <input
                        id="friend-name"
                        type="text"
                        placeholder="Name"
                        value={friend.name}
                        onChange={(e) => handleFriendChange(index, 'name', e.target.value, friends, setFriends, stations, updateMarker)}
                    />
                    <select
                        id="starting-station"
                        value={friend.station}
                        onChange={(e) => {
                            handleFriendChange(index, 'station', e.target.value, friends, setFriends, stations, updateMarker);
                        }}
                    >
                        <option value="">Starting Station</option>
                        {renderStationOptions(stations)}
                    </select>
                    <button className="remove-button" onClick={() => removeFriend(index, friends, setFriends, removeMarker)}
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