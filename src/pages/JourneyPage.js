import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";

import MapComponent from "../components/mapbox/MapComponent";
import {MapProvider} from "../components/mapbox/MapContext";
import JourneyResultComponent from "../components/journey/JourneyResultComponent";
import {LoadingComponent} from "../components/LoadingSpin";

const JourneyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const journeyResults = location.state?.journeyResults;
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(async () => {
        if (!journeyResults) {

            const response = await fetch(`/api/trip?tripId=${id}`);
            if (response.status !== 200) {
                setIsRedirecting(true);
                const redirectTimeout = setTimeout(() => {
                    navigate('/planner');
                }, 3000);
                return () => clearTimeout(redirectTimeout);
            }
            const journey = await response.json();
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