import GetStations from "./fetchStations";
import mockComputeJourney from "./mockComputeJourney";

const API_ENDPOINT = "https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/trips";
const API_KEY = process.env.NS_KEY ;

const fetchJourneyData = async(fromStation, toStation, datetime) => {
    const url = new URL(API_ENDPOINT);
    url.searchParams.append("fromStation", fromStation);
    url.searchParams.append("toStation", toStation);
    url.searchParams.append("datetime", datetime);

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch journey data: ${response.statusText}`);
    }

    return response.json();
}


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

    const datetime = meetingOptions.datetime.toISOString();
    const modifiedFriends = [];

    for (const friend of friends) {
        try {
            const response = await fetchJourneyData(friend.location, meetingOptions.meeting_station, datetime);
            const trip = response.trips[0]; // Take the first trip as the best option

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