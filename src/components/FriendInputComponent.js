import React, { useEffect, useState } from 'react';
import GetStations from "../functions/StationList.js";

const FriendInputComponent = () => {
    const [friends, setFriends] = useState([{
        name: '', station: '', earliest_time: '', latest_time: '', duration: ''
    }]);
    const [stationOptions, setStationOptions] = useState([]);

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
        { type: 'time', placeholder: 'Earliest Departure Time', field: 'earliest_time' },
        { type: 'time', placeholder: 'Latest Departure Time', field: 'latest_time' },
        { type: 'time', placeholder: 'Meetup Duration', field: 'duration' },

    ];

    // func to handle adding new rows
    const addFriend = () => {
        if (friends.length < 5) {
            setFriends([...friends, {
                name: '', station: '', earliest_time: '', latest_time: '', duration: ''
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

    return (
        <div className="user-inputs">
            {friends.map((friend, index) => (
                <div key={index} className="friend-row">
                    {/* Dynamically generate inputs */}
                    {inputConfig.map((input, inputIndex) => (
                        input.type === 'select' ? (
                            <select
                                key={inputIndex}
                                value={friend[input.field]}
                                onChange={(e) => handleInputChange(index, input.field, e.target.value)}
                            >
                                <option value="">Select {input.placeholder}</option>
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

                    {friends.length > 1 && (
                        <button className="remove-button" onClick={() => removeFriend(index)}>
                            &ndash;
                        </button>
                    )}
                </div>
            ))}

            <button onClick={addFriend} disabled={friends.length >= 5}>
                Add Friend
            </button>
        </div>
    );
};


export default FriendInputComponent;