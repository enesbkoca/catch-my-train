export default async function handler(req, res) {
    const { query } = req;
    const { fromStation, toStation, datetime } = query;

    const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/trips?fromStation=${fromStation}&toStation=${toStation}&datetime=${datetime}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.NS_KEY, // Replace with your NS API key
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: response.statusText });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}