import React, {useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import MapComponent from "../components/MapComponent";
import {MapProvider} from "../components/MapContext";
import JourneyResultComponent from "../components/JourneyResultComponent";

const JourneyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const journeyResults = location.state?.journeyResults;

    // Redirect to planner if no journey results
    useEffect(() => {
        if (!journeyResults) {
            navigate('/planner');
        }
    }, [journeyResults, navigate]);

    return (
        <div>
            <MapProvider>
                <div className="mainbody">
                    {journeyResults && (
                        <div>
                            <JourneyResultComponent journeyResult={journeyResults} />
                        </div>
                    )}

                    <div className="MapComponent">
                        <MapComponent/>
                    </div>
                </div>
            </MapProvider>
        </div>
    )
}

export default JourneyPage;