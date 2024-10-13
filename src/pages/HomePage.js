import React from 'react';
import MapComponent from "../components/MapComponent";
import {MapProvider} from "../components/MapContext";

const HomePage = () => {
    return (
        <div>
            <MapProvider>
                <MapComponent/>
            </MapProvider>
        </div>
    )
}

export default HomePage;