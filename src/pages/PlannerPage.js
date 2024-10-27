import React, {useState} from 'react';
import FriendInputComponent from "../components/planner/FriendInputComponent";
import MapComponent from "../components/mapbox/MapComponent";
import {MapProvider} from "../components/mapbox/MapContext";
import {useNavigate} from "react-router-dom";
import computeJourney from "../utils/computeJourney";
import {RedirectComponent} from "../components/Redirect";

const PlannerPage = () => {
    const [loading, setLoading] = useState(false); // State to track loading
    const navigate = useNavigate(); // Use the navigate hook

    const handleSubmit = async (friends, meetingOptions) => {
        setLoading(true); // Set loading to true before submission
        try {
            // Await the async computeJourney function
            const journeyResults = await computeJourney(friends, meetingOptions);
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Navigate to the '/journey' page and pass the journey results
            navigate('/journey', { state: { journeyResults } });
        } catch (error) {
            console.error('Error during journey computation:', error);
        } finally {
            setLoading(false); // Reset loading after submission
        }
    };

    return (
        <div>
            <MapProvider>
                <div className="mainbody">
                    <div>
                        <FriendInputComponent onSubmit={handleSubmit} loading={loading} />
                    </div>

                    <div className="MapComponent">
                        <MapComponent />
                    </div>
                </div>

                {/* Show RedirectComponent when loading */}
                {loading && <RedirectComponent message="We're preparing your journey..." />}
            </MapProvider>
        </div>
    );
}
export default PlannerPage;