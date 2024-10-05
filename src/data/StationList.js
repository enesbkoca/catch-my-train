import pl from 'nodejs-polars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const GetStations = () => {
    const filePath = path.resolve(__dirname, 'stations-2023-09.csv');
    const df = pl.readCSV(filePath);

    let listStations = df
        .filter(pl.col('country').eq(pl.lit('NL')))
        // .select("uic", "name_long", "geo_lat", "geo_long")
        .select("name_long")
        .toSeries().toArray()

    listStations = listStations.map(x => x.replace(/"/g, ''));

    return listStations
}

export default GetStations;