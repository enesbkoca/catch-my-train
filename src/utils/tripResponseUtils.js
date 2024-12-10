const addTripInfo = async (friends, meetingStation, datetime, reverseStationMap) => {
    for (const friend of friends) {
        try {
            const params = new URLSearchParams();
            params.append('fromStation', reverseStationMap[friend.station]);
            params.append('toStation', meetingStation);
            params.append('dateTime', datetime);

            const response = await fetch(`/api/trips?${params.toString()}`, {
                method: 'GET',
            });

            friend.trips = await response.json();
        } catch (error) {
            console.error(`Failed to compute journey for friend ${friend.name}: ${error.message}`);
        }
    }

    return friends;
}

const filterTripData = (item) => ({
    idx: item.idx,
    legs: item.legs.map(leg => ({
        idx: leg.idx,
        origin: leg.origin,
        destination: leg.destination,
    })),
    fareRoute: item.fareRoute,
    shareUrl: item.shareUrl
});

const addDepartureArrivalInfo = (trip) => {
    const nLegs = trip.legs.length;

    const departureTime = trip.legs[0].origin.plannedDateTime;
    const arrivalTime = trip.legs[nLegs - 1].destination.plannedDateTime;


    return {
        tripDepartureTime: departureTime,
        tripArrivalTime: arrivalTime,
        ...trip
    };
}

const findOptimumTripIdx = (friends) => {
    // TODO: Actually implement the algorithm to find the optimum trips to take
    // For now only return the first trips out of the bunch

    return friends.map((friend) => ({
        ...friend,
        optimumTripIdx: 0
    }));
}

module.exports = { addTripInfo, filterTripData, addDepartureArrivalInfo, findOptimumTripIdx };