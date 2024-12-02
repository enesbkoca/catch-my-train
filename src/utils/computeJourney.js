import GetStations from "./fetchStations";
import mockComputeJourney from "./mockComputeJourney";

const computeJourney = async (friends, meetingOptions, mock = false) => {
    /*
     * input @param {Array} friends - An array of friend objects, where each object contains details about a friend.
     * Each friend object has the following structure:
     *
     * {
     *   id: {number} - Unique identifier for the friend,
     *   name: {string} - Name of the friend,
     * }
     *
     *
     * input @param {Object} meetingOptions - An object containing meeting options.
     * meetingOptions has the following structure:
     *
     * {
     *   datetime: {Date} - The date and time of the meeting,
     *   duration: {string} - The duration of the meeting in HH:MM format
     * }
     *
     *
     * output @param {Object} modifiedMeetingOptions - An object containing meeting options after computeJourney
     * modifiedMeetingOptions has the following structure:
     *
     * {
     * @property {string} meeting_station - The station where the meeting will take place
     * @property {string} actual_duration - The actual duration of the meeting
     * }
     *
     *
     * output @param {Array} modifiedFriends - An array of friend objects, where each object contains details about a friend.
     * Each friend object has the following structure:
     *
     * {
     *   id: {number} - Unique identifier for the friend,
     *   name: {string} - Name of the friend,
     *   location: {string} - Current location of the friend,
     *   trainRide: {Array} - Array of train ride objects, each containing:
     *     {
     *       ride_departure: {Date} - Departure time of the ride,
     *       ride_arrival: {Date} - Arrival time of the ride,
     *       station_departure: {string} - Departure station name,
     *       station_arrival: {string} - Arrival station name
     *     },
     *   departure_time: {Date} - Departure time for the journey,
     *   arrival_time: {Date} - Arrival time for the journey
     * }
     */

    console.log("Input Friends:", friends);
    console.log("Input Meeting Options:", meetingOptions)   ;

    if (mock) {
        return mockComputeJourney(friends, meetingOptions);
    }

    const allStations = await GetStations();

    // Map station code to name for convenience
    const stationMap = Object.fromEntries(allStations.map((station) => [station.code, station.name]));
    const reverseStationMap = Object.fromEntries(allStations.map((station) => [station.name, station.code]));

    const datetime = meetingOptions.datetime.toISOString();
    const modifiedFriends = [];
    const meetingStation = "Out" // Utrecht Centraal


    for (const friend of friends) {
        try {
            const params = new URLSearchParams();
            params.append('fromStation', reverseStationMap[friend.station]);
            params.append('toStation', meetingStation);
           params.append('datetime', datetime.replace(/\.\d{3}Z$/, 'Z'));

            console.log("Request params: ", params);

            const response = await fetch(`/api/proxy?${params.toString()}`, {
                method: 'GET',
            });

            const data = await response.json();
            const trip = data.trips[0];

            const rideDetails = trip.legs.map((leg) => ({
                ride_departure: new Date(leg.origin.actualDateTime),
                ride_arrival: new Date(leg.destination.actualDateTime),
                station_departure: stationMap[leg.origin.stationCode] || leg.origin.name,
                station_arrival: stationMap[leg.destination.stationCode] || leg.destination.name,
            }));

            modifiedFriends.push({
                ...friend,
                trainRide: rideDetails,
                departure_time: new Date(trip.legs[0].origin.actualDateTime),
                arrival_time: new Date(trip.legs[trip.legs.length - 1].destination.actualDateTime),
            });
        } catch (error) {
            console.error(`Failed to compute journey for friend ${friend.name}: ${error.message}`);
        }
    }

    const modifiedMeetingOptions = {
        meeting_station: meetingOptions.meeting_station,
        actual_duration: meetingOptions.duration, // Adjust if actual trip duration affects it
    };

    console.log("Modified Friends:", modifiedFriends);
    console.log("Modified Meeting Options:", modifiedMeetingOptions);

    // Return the modified objects
    return {friends: modifiedFriends, meetingOptions: modifiedMeetingOptions};
};

export default computeJourney;