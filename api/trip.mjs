import { createClient } from '@supabase/supabase-js';

import { addDepartureArrivalInfo, filterTripData, findOptimumTripIdx, generateNSUrl } from "./utils.js";


const supabase = await createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { friends, meetingStation, datetime } = req.body;

        console.log("Received Query Parameters:", { friends, meetingStation, datetime});

        if (!meetingStation || !datetime) {
            return res.status(400).json({ error: "Missing meetingStation or datetime query parameters." });
        }

        for (const friend of friends) {

            if (!friend.station) {
                return res.status(400).json({ error: "Missing friend.station query parameter." });
            }

            const fromStation = friend.station;

            const apiUrl = generateNSUrl( fromStation, meetingStation, datetime );

            try {
                const response = await fetch(apiUrl, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': process.env.NS_KEY,
                    }
                });

                if (!response.ok) {
                    return res.status(response.status).json({ error: response.statusText });
                }

                const tripData = (await response.json())["trips"];

                const filteredTrips = tripData.map(item => filterTripData(item));
                const enrichedTrips = filteredTrips.map(item => addDepartureArrivalInfo(item));

                friend.trips = enrichedTrips;

            } catch (error) {
                console.error("Proxy error:", error.stack);
                return res.status(500).json({ error: error.message });
            }

        }

        const tripInformation = findOptimumTripIdx(friends);

        const { data, error } = await supabase
            .from('trips')
            .insert({trip_information: tripInformation})
            .select()
            .single();

        console.log("Supabase insert status:", { data, error });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ data });

    } else if (req.method === 'GET'){

        const {tripId} = req.query;

        const { data, error } = await supabase
            .from('trips')
            .select()
            .eq('trip_id', tripId)
            .single();

        console.log("Supabase fetch status:", { data, error });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ data });

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}