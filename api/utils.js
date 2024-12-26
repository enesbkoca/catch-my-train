const updateStationsTable = async (supabase) => {
    try {
        const response = await fetch(`https://gateway.apiportal.ns.nl/nsapp-stations/v3`, {
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.NS_KEY,
            }
        });

        let responseObj = await response.json();

        const stations = responseObj.payload
            .filter(station => station.country === "N")
            .map(station => ({
                stationCode: station.id.code,
                uicCode:  station.id.uicCode,
                longName: station.names.long,
                mediumName: station.names.medium,
                shortName: station.names.short,
                coordinates: station.location
            }));

        if (stations.length === 0) throw new Error("No stations left in the response");

        console.log(`Sanitized station info`);

        await supabase
            .from('stations')
            .delete()
            .neq('stationCode', '');

        console.log(`Deleted stations from DB`);

        const { data, error } = await supabase
            .from('stations')
            .insert(stations);

        console.log("Supabase insert status:", { data, error });

        return stations

    } catch (error) {
        console.error("Error updating stations table:", error);
        console.log("Fetching the current table from the DB");

        const { data, err } = await supabase
            .from('stations')
            .select();

        console.log("Supabase fetch status:", {
            firstFewRows: data.slice(0, 3),
            totalRows: data.length,
            err
        });

        return data
    }
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

function generateNSUrl(fromStation, toStation, datetime) {
    const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/trips?fromStation=${fromStation}&toStation=${toStation}&dateTime=${datetime}`;

    return url;
}

module.exports = { generateNSUrl, filterTripData, addDepartureArrivalInfo, findOptimumTripIdx, fetchStationsTable: updateStationsTable }

