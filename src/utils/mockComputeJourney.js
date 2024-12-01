import GetStations from "./fetchStations";

const mockComputeJourney = async (friends, meetingOptions) => {

    const allStations = await GetStations();

    // helper function to get a random station
    const getRandomStation = () => {
        const randomIndex = Math.floor(Math.random() * allStations.length);
        return allStations[randomIndex];
    };

    const modifiedFriends = friends.map(friend => {
        // First ride: random departure and arrival stations
        const firstRideDeparture = getRandomStation();
        const firstRideArrival = getRandomStation();

        // Second ride: starts from first ride's arrival station, ends at Utrecht Centraal
        const secondRideDeparture = firstRideArrival;
        const secondRideArrival = {name: "Utrecht Centraal"};

        return {
            ...friend, // Keep existing properties of each friend
            trainRide: [
                {
                    ride_departure: new Date(new Date(meetingOptions.datetime).getTime() + (Math.random() * 30 - 15) * 60 * 1000), // Mocked departure time (meetingOptions.time ± 15 minutes)
                    ride_arrival: new Date(new Date(meetingOptions.datetime).getTime() + 30 * 60 * 1000), // 30 minutes later
                    station_departure: firstRideDeparture.name,
                    station_arrival: firstRideArrival.name
                },
                {
                    ride_departure: new Date(new Date(meetingOptions.datetime).getTime() + 40 * 60 * 1000), // Mocked time for second ride
                    ride_arrival: new Date(new Date(meetingOptions.datetime).getTime() + 70 * 60 * 1000), // 30 minutes later after second ride departure
                    station_departure: secondRideDeparture.name,
                    station_arrival: secondRideArrival.name
                }
            ],
            departure_time: meetingOptions.datetime, // Mock departure date (today)
            arrival_time: new Date(new Date(meetingOptions.datetime).getTime() + 70 * 60 * 1000), // Mocked arrival date (70 mins later)
        };
    });

// Modify meetingOptions to add the required fields
    const modifiedMeetingOptions = {
        ...meetingOptions,
        meeting_station: "Utrecht Centraal", // Meeting station is always Utrecht Centraal
        actual_duration: (() => {
            const [hours, minutes] = meetingOptions.duration.split(":").map(Number);
            const totalMinutes = hours * 60 + minutes + Math.floor(Math.random() * 61) - 30;
            const newHours = Math.floor(totalMinutes / 60);
            const newMinutes = totalMinutes % 60;
            return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
        })()
    };

    // Return the modified objects
    return {friends: modifiedFriends, meetingOptions: modifiedMeetingOptions};

};

export default mockComputeJourney;