import { createClient } from '@supabase/supabase-js';

import tripUtils from '../src/utils/tripResponseUtils.js';
const { addDepartureArrivalInfo, filterTripData } = tripUtils;


const supabase = createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { fromStation, toStation, dateTime } = req.body;

        console.log("Received Query Parameters:", { fromStation, toStation, dateTime });

        if (!fromStation || !toStation || !dateTime) {
            return res.status(400).json({ error: "Missing required query parameters" });
        }

        const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/trips?fromStation=${fromStation}&toStation=${toStation}&dateTime=${dateTime}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.NS_KEY,
                },
            });

            if (!response.ok) {
                return res.status(response.status).json({ error: response.statusText });
            }

            const tripData = (await response.json())["trips"];

            const filteredTrips = tripData.map(item => filterTripData(item));
            const enrichedTrips = filteredTrips.map(item => addDepartureArrivalInfo(item));

            const { data, error } = await supabase.from('journeys').insert({
                journey_result: enrichedTrips
            });

            console.log("Supabase insert status:", { data, error });

            return res.status(200).json(enrichedTrips);

        } catch (error) {
            console.error("Proxy error:", error.stack);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}