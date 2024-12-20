import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import MapComponent from "../components/mapbox/MapComponent";
import {MapProvider} from "../components/mapbox/MapContext";
import JourneyResultComponent from "../components/journey/JourneyResultComponent";
import {LoadingComponent} from "../components/LoadingSpin";

const JourneyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const journeyResults = location.state?.journeyResults;
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!journeyResults) {
            setIsRedirecting(true);
            // Delay for 5 seconds, then redirect
            const redirectTimeout = setTimeout(() => {
                navigate('/planner');
            }, 3000);

            // Cleanup timeout on component unmount
            return () => clearTimeout(redirectTimeout);
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

                    {isRedirecting &&
                        <div>
                            <LoadingComponent message={"No journey planned yet. Taking you back to the planner..."}/>
                        </div>
                    }
                    <div className="MapComponent">
                        <MapComponent/>
                    </div>
                </div>
            </MapProvider>
        </div>
    );
};

export default JourneyPage;