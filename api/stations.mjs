import { createClient } from "@supabase/supabase-js";
import { waitUntil } from "@vercel/functions";

const supabase = createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Upserts stations in the Supabase database (deletes existing and inserts new ones)
const upsertStations = async (supabase, stations) => {
    try {
        await supabase
            .from('stations')
            .delete()
            .neq('stationCode', '');
        console.log(`Deleted stations from DB`);

        const { data, error } = await supabase
            .from('stations')
            .insert(stations);
        console.log("Supabase insert status:", { data, error });

        if (error) {
            console.error("Error during Supabase operations:", error);
            throw error;
        }
    } catch (err) {
        console.error("Error during Supabase operations:", err);
        throw err;
    }
};

// Fetch stations from NS and transform them into required format
const fetchAndTransformStations = async () => {
    try {
        const response = await fetch(`https://gateway.apiportal.ns.nl/nsapp-stations/v3`, {
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.NS_KEY,
            },
        });

        const fetchedStationData = await response.json();

        const stations = fetchedStationData.payload
            .filter(station => station.country === "NL")
            .map(station => ({
                stationCode: station.id.code,
                uicCode: station.id.uicCode,
                longName: station.names.long,
                mediumName: station.names.medium,
                shortName: station.names.short,
                coordinates: station.location,
            }));

        if (stations.length === 0) throw new Error("No stations left in the response");
        return stations;
    } catch (error) {
        console.error("Error fetching or transforming station data:", error);
        throw error;
    }
};

const updateStationsTable = async (supabase) => {
    try {
        // TODO: Migrate to a proper backend from vercel functions.
        // Update once a day, or if an error is triggered bcs a station was not found
        throw new Error("Throwing error, as db operations are done at every call bcs of vercel functions, so fetching results directly from db instead.");

        const stations = await fetchAndTransformStations();

        // This is to allow upsert to run async in vercel functions, so the function is not killed after response is sent.
        waitUntil(upsertStations(supabase, stations));

        console.log('Returning sanitized station info');
        return stations;

    } catch (error) {
        console.error("Error updating stations table:", error);
        console.log("Fetching the current table from the DB");

        const { data, err } = await supabase
            .from('stations')
            .select();

        console.log("Supabase fetch status:", {
            firstFewRows: data.slice(0, 1),
            totalRows: data.length,
            err,
        });

        return data;
    }
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const stations = await updateStationsTable(supabase);
        return res.status(200).json({ stations });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}

module.exports = { fetchAndTransformStations, upsertStations}