const computeJourney = async (tripInformation, meetingOptions) => {
    console.log("Input Trip Information:", tripInformation);
    console.log("Input Meeting Options:", meetingOptions);

    try {
        const response = await fetch('/api/trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tripInformation: tripInformation,
                meetingOptions: meetingOptions,
            })
        });

        const updatedFriends = await response.json();

        return {
            tripInformation: updatedFriends.data.trip_information,
            meetingOptions: meetingOptions,
            tripId: updatedFriends.data.trip_id
        }

    } catch (error) {
        console.error(`Failed to fetch trips: ${error.message}`)
    }
};

export default computeJourney;