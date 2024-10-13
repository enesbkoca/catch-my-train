import React, {useEffect, useState} from 'react';
import FriendInputComponent from "../components/FriendInputComponent";
import MapComponent from "../components/MapComponent";
import {MapProvider} from "../components/MapContext";
import GetStations from "../utils/fetchStations";

const PlannerPage = () => {
    const [stations, setStations] = useState([])

    useEffect(() => {
        const fetchStations = async () => {
            const stationsData = await GetStations();
            setStations(stationsData);
        };

        fetchStations();
    }, []);

    return (
        <div>
            <MapProvider>
                <div className="mainbody">
                    <div>
                        <FriendInputComponent stations={stations}/>
                    </div>

                    <div className="MapComponent">
                        <MapComponent/>
                    </div>
                </div>
            </MapProvider>
        </div>
    )
}

export default PlannerPage;