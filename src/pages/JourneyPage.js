import React from 'react';
import {useLocation} from "react-router-dom";

import MapComponent from "../components/MapComponent";
import {MapProvider} from "../components/MapContext";
import JourneyResultComponent from "../components/JourneyResultComponent";

const JourneyPage = () => {
    const location = useLocation();
    const journeyResults = location.state?.journeyResults;

    return (
        <div>
            <MapProvider>
                <div className="mainbody">
                    <div>
                        <JourneyResultComponent journeyResult={journeyResults} />
                    </div>

                    <div className="MapComponent">
                        <MapComponent/>
                    </div>
                </div>
            </MapProvider>
        </div>
    )
}

export default JourneyPage;