export default async function handler(req, res) {
    if (req.method === 'GET') {

        const { fromStation, toStation, dateTime } = req.query;

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

            const data = await response.json();
            const tripData = data["trips"];
            const filteredTrips = tripData.map(item => ({
                idx: item.idx,
                legs: item.legs.map(leg => ({
                    idx: leg.idx,
                    origin: leg.origin,
                    destination: leg.destination,
                    stops: leg.stops
                }))
            }));


            return res.status(200).json(filteredTrips);

        } catch (error) {
            console.error("Proxy error:", error.stack);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}