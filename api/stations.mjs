import {createClient} from "@supabase/supabase-js";
import { fetchStationsTable } from "./utils.js";


const supabase = await createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const stations =  await fetchStationsTable(supabase);


export default async function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json({ stations });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}