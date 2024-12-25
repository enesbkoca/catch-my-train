

function generateNSUrl(fromStation, toStation, datetime) {
    const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/trips?fromStation=${fromStation}&toStation=${toStation}&dateTime=${datetime}`;

    return url;
}



module.exports = { generateNSUrl }

