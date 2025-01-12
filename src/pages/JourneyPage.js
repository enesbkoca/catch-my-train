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

    const [meetingOptions, setMeetingOptions] = useState(location.state?.journeyResults.meetingOptions || null);
    const [tripInformation, setTripInformation] = useState(location.state?.journeyResults.tripInformation || null);

    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isLoading, setIsLoading] = useState(!tripInformation);



    useEffect(() => {
        const fetchData = async () => {
            if (!tripInformation) {
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

                    setTripInformation(data.data.trip_information);
                    setMeetingOptions(data.data.meeting_options);

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
    }, [tripInformation, meetingOptions, navigate, id]);

    return (
        <div>
            <MapProvider>
                <div className="mainbody">
                    {tripInformation ? (
                        <JourneyResultComponent tripInformation={tripInformation} meetingOptions={meetingOptions} />
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