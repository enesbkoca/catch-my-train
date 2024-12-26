import { createClient } from "@supabase/supabase-js";
import { waitUntil } from "@vercel/functions";

const supabase = createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updateStationsInDatabase = async (supabase, stations) => {
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

const updateStationsTable = async (supabase) => {
    try {
        const response = await fetch(`https://gateway.apiportal.ns.nl/nsapp-stations/v3`, {
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.NS_KEY,
            },
        });

        let responseObj = await response.json();

        const stations = responseObj.payload
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

        // Update database asynchronously using waitUntil
        waitUntil(updateStationsInDatabase(supabase, stations));

        console.log('Returning sanitized station info');
        return stations;

    } catch (error) {
        console.error("Error updating stations table:", error);
        console.log("Fetching the current table from the DB");

        const { data, err } = await supabase
            .from('stations')
            .select();

        console.log("Supabase fetch status:", {
            firstFewRows: data.slice(0, 3),
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