import GetStations from "./fetchStations";
import mockComputeJourney from "./mockComputeJourney";
import {createTrip, findOptimumTripIdx} from "./tripResponseUtils";

const computeJourney = async (friends, meetingOptions, mock = false) => {
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

    // Add trip information
    friends = await createTrip(friends, meetingOptions.meetingStation, datetime, reverseStationMap);

    friends = findOptimumTripIdx(friends);

    console.log("friends after computeJourney: ", friends);
    console.log("meetingOptions after computeJourney: ", meetingOptions);

    // Return the updated objects
    return {friends: friends, meetingOptions: meetingOptions};
};

export default computeJourney;