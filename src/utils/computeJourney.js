import GetStations from "./fetchStations";
import mockComputeJourney from "./mockComputeJourney";
import {addTripInfo, findOptimumTripIdx} from "./tripResponseUtils";

const computeJourney = async (friends, meetingOptions, mock = false) => {
    /*
     * input @param {Array} friends - An array of friend objects, where each object contains details about a friend.
     * Each friend object has the following structure:
     *
     * {
     *   id: {number} - Unique identifier for the friend,
     *   name: {string} - Name of the friend,
     *   station: {string} - Station code of friend
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
    // const stationMap = Object.fromEntries(allStations.map((station) => [station.code, station.name]));
    const reverseStationMap = Object.fromEntries(allStations.map((station) => [station.name, station.code]));

    const datetime = meetingOptions.datetime.toISOString();
    const meetingStation = "Ut" // Utrecht Centraal
    // Add trip information
    friends = await addTripInfo(friends, meetingStation, datetime, reverseStationMap);

    friends = findOptimumTripIdx(friends);

    // Return the updated objects
    return {friends: friends, meetingOptions: meetingOptions};
};

export default computeJourney;