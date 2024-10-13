import React from 'react';
import {useLocation} from "react-router-dom";

import MapComponent from "../components/MapComponent";
import {MapProvider} from "../components/MapContext";

const JourneyPage = () => {
    const location = useLocation();
    const journeyResults = location.state?.journeyResults;

    return (
        <div>
            <MapProvider>
                <MapComponent/>
            </MapProvider>

            {journeyResults ? (
                <p style={{ zIndex: 1000 }}>
                    I got some journey results oiiii
                </p>
                    ) : (
                <p style={{ zIndex: 1000 }}>
                    No journey found :(
                </p>
                )
            }
        </div>
    )
}

export default JourneyPage;