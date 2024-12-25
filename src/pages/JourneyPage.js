import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";

import MapComponent from "../components/mapbox/MapComponent";
import { MapProvider } from "../components/mapbox/MapContext";
import JourneyResultComponent from "../components/journey/JourneyResultComponent";
import { LoadingComponent } from "../components/LoadingSpin";

const JourneyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const [journeyResults, setJourneyResults] = useState(location.state?.journeyResults || null);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isLoading, setIsLoading] = useState(!journeyResults);



    useEffect(() => {
        const fetchData = async () => {
            if (!journeyResults) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`/api/trip?tripId=${id}`);
                    if (!response.ok) {
                        setIsRedirecting(true);
                        const redirectTimeout = setTimeout(() => {
                            navigate('/planner');
                        }, 3000);
                        return () => clearTimeout(redirectTimeout);
                    }
                    const data = await response.json();
                    console.log("Fetched journey data:", data);
                    setJourneyResults(data.data.trip_information);
                } catch (error) {
                    console.error("Error fetching journey data:", error);
                    setIsRedirecting(true);
                    const redirectTimeout = setTimeout(() => {
                        navigate('/planner');
                    }, 3000);
                    return () => clearTimeout(redirectTimeout);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [journeyResults, navigate, id]);

    return (
        <div>
            <MapProvider>
                <div className="mainbody">
                    {journeyResults ? (
                        <JourneyResultComponent journeyResult={journeyResults} />
                    ) : isLoading ? (
                        <LoadingComponent message="Loading journey..." />
                    ) : isRedirecting ? (
                        <LoadingComponent message="No journey planned yet. Taking you back to the planner..." />
                    ) : null}
                    <div className="MapComponent">
                        <MapComponent />
                    </div>
                </div>
            </MapProvider>
        </div>
    );
};

export default JourneyPage;