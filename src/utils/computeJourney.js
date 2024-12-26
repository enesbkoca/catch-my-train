const computeJourney = async (friends, meetingOptions) => {
    console.log("Input Friends:", friends);
    console.log("Input Meeting Options:", meetingOptions);

    const meetingStation = meetingOptions.meetingStation;
    const datetime = meetingOptions.datetime.toISOString();

    try {
        const response = await fetch('/api/trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friends: friends,
                meetingStation: meetingStation,
                datetime: datetime,
            })
        });

        const updatedFriends = await response.json();

        return {
            friends: updatedFriends.data.trip_information,
            meetingOptions: meetingOptions,
            tripId: updatedFriends.data.trip_id
        }

    } catch (error) {
        console.error(`Failed to fetch trips: ${error.message}`)
    }
};

export default computeJourney;