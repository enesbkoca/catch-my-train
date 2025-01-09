import {createClient} from "@supabase/supabase-js";
import { fetchAndTransformStations, upsertStations } from "./stations.mjs";

const supabase = createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET(request) {
    const stations = await fetchAndTransformStations();
    await upsertStations(supabase, stations);
}
