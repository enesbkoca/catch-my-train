import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { data, err } = await supabase
            .from('stations')
            .select();

        console.log("Supabase fetch status:", {
            firstFewRows: data.slice(0, 1),
            totalRows: data.length,
            err,
        });

        return res.status(200).json({ stations: data });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}