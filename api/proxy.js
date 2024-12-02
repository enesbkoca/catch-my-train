export default async function handler(req, res) {
    const { fromStation, toStation, datetime } = req.query;

    console.log("Received Query Parameters:", { fromStation, toStation, datetime });

    if (!fromStation || !toStation || !datetime) {
        return res.status(400).json({ error: "Missing required query parameters" });
    }

    const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/trips?fromStation=${fromStation}&toStation=${toStation}&datetime=${datetime}`;

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
        return res.status(200).json(data);
    } catch (error) {
        console.error("Proxy error:", error.stack);
        return res.status(500).json({ error: error.message });
    }
}