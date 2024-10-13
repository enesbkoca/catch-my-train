import React from 'react';
import MapComponent from "../components/MapComponent";
import {MapProvider} from "../components/MapContext";

const JourneyPage = () => {
    return (
        <div>
            <MapProvider>
                <MapComponent/>
            </MapProvider>
        </div>
    )
}

export default JourneyPage;