import { createClient } from "@supabase/supabase-js";
import {updateStationsTable} from "./utils.js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export default async function handler(req, res) {
    if (req.method === 'GET') {
        const stations = await updateStationsTable(supabase);
        return res.status(200).json({ stations });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}