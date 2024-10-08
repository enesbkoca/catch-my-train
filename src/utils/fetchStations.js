import Papa from 'papaparse';

const GetStations = async () => {
    const filePath = process.env.PUBLIC_URL + '/stations-2023-09.csv';

    const response = await fetch(filePath);
    const csvData = await response.text();


    const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
    });

    let stations = parsedData.data
        .filter(station => station.country === 'NL')
        .map(station => ({
            name: station.name_long.replace(/"/g, ''),
            coordinates: [parseFloat(station.geo_lat), parseFloat(station.geo_lng)]
        }));
    console.log(stations);
    return stations;
}

export default GetStations;