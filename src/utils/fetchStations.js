const getStations = async () => {
    const response = await fetch('/api/stations');
    const data = await response.json();
    const stations = data.stations

    console.log({ message: 'getStations fetched stations', stations });

    return stations.map(station => ({
                name: station.longName,
                coordinates: station.coordinates,
                code: station.stationCode
            }));
}

export default getStations;