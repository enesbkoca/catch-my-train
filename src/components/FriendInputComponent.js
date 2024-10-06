import React, { useEffect, useState } from 'react';
import GetStations from "../functions/StationList.js";

const FriendInputComponent = () => {
    const [friends, setFriends] = useState([
            {name: '', station: ''}, {name: '', station: ''}
        ]
    );
    const [stationOptions, setStationOptions] = useState([]);

    const getTodaysDate = () => {
        const now = new Date();
        return String(now.getDate()).padStart(2, '0');
    }

    const getOneHourAheadTime = () => {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`; // Format to HH:MM
    };

    const [meetingOptions, setMeetingOptions] = useState([{
        date: getTodaysDate(), meeting_time: getOneHourAheadTime(), duration: '03:00'}])

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const stations = await GetStations();
                setStationOptions(stations);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchStations();
    }, []);

    // store the items in the input
    const inputConfig = [
        { type: 'text', placeholder: 'Name', field: 'name' },
        { type: 'select', placeholder: 'Starting Station', field: 'station', options: stationOptions},
    ];



    // func to handle adding new rows
    const addFriend = () => {
        if (friends.length < 5) {
            setFriends([...friends, {
                name: '', station: '',
            }]);
        }
    };

    // func to remove row
    const removeFriend = (index) => {
        const newFriends = friends.filter((_, i) => i !== index);
        setFriends(newFriends);
    };

    // func to handle input changes
    const handleInputChange = (index, field, value) => {
        const newFriends = [...friends];
        newFriends[index][field] = value;
        setFriends(newFriends);
    };

    const handleMeetingChange = (field, value) => {
        const newOptions = [...meetingOptions];
        newOptions[field] = value;
        setMeetingOptions(newOptions);
    }

    return (
        <div className="user-inputs">
            {friends.map((friend, index) => (
                <div key={index} className="row friend">
                    {/* Dynamically generate inputs */}
                    {inputConfig.map((input, inputIndex) => (
                        input.type === 'select' ? (
                            <select
                                key={inputIndex}
                                value={friend[input.field]}
                                onChange={(e) => handleInputChange(index, input.field, e.target.value)}
                            >
                                <option value="">{input.placeholder}</option>
                                {input.options.map((option, optIndex) => (
                                    <option key={optIndex} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                key={inputIndex}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={friend[input.field]}
                                onChange={(e) => handleInputChange(index, input.field, e.target.value)}
                            />
                        )
                    ))}

                    <button className="remove-button" onClick={() => removeFriend(index)} disabled={friends.length < 3}>
                        &ndash;
                    </button>
                </div>
            ))}

            <div className="row meeting-options">
                <input
                    type="date"
                    value={meetingOptions.date}
                    onChange={(e) => handleMeetingChange(meetingOptions["date"], e.target.value)}
                />
                <input
                    type="time"
                    value={meetingOptions.meeting_time}
                    onChange={(e) => handleMeetingChange(meetingOptions["time"], e.target.value)}
                />
                <input
                    type="time"
                    value={meetingOptions.duration}
                    onChange={(e) => handleMeetingChange(meetingOptions["duration"], e.target.value)}
                />
                <button className="add-button" onClick={addFriend} disabled={friends.length >= 5}>
                    +
                </button>
            </div>

            <button className="submit">
                Find the perfect train
            </button>

        </div>
    );
};


export default FriendInputComponent;