import Papa from 'papaparse';

const GetStations = async () => {
    const filePath = process.env.PUBLIC_URL + '/stations-2023-09.csv';

    const response = await fetch(filePath);
    const csvData = await response.text();


    const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
    });

    let listStations = parsedData.data
        .filter(station => station.country === 'NL')  // filter rows where country is 'NL'
        .map(station => station.name_long.replace(/"/g, ''));  // remove quotes from 'name_long'

    return listStations;
}

console.log(GetStations());

export default GetStations;