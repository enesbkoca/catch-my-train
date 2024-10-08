const getTodaysDate = () => {
    const now = new Date();
    return String(now.getDate()).padStart(2, '0');
}

const getOneHourAheadTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`; // Format to HH:MM
};

export { getTodaysDate, getOneHourAheadTime };