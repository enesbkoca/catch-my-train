import {createClient} from "@supabase/supabase-js";
import {fetchAndTransformStations, upsertStations} from "./utils.js";


const supabase = createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
    try {
        console.log("Fetching and transforming stations...");
        const stations = await fetchAndTransformStations();
        console.log("Stations fetched and transformed:", stations);

        console.log("Upserting stations into Supabase...");
        await upsertStations(supabase, stations);
        console.log("Stations upserted successfully.");

        res.status(200).json({ success: true, message: "Stations updated successfully." });
    } catch (error) {
        console.error("Error updating stations:", error);
        res.status(500).json({ success: false, message: "Failed to update stations.", error: error.message });
    }
}