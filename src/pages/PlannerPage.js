import React from 'react';
import FriendInputComponent from "../components/planner/FriendInputComponent";
import MapComponent from "../components/mapbox/MapComponent";
import {MapProvider} from "../components/mapbox/MapContext";

const PlannerPage = () => {
    return (
        <div>
            <MapProvider>
                <div className="mainbody">
                    <div>
                        <FriendInputComponent/>
                    </div>

                    <div className="MapComponent">
                        <MapComponent/>
                    </div>
                </div>
            </MapProvider>
        </div>
    )
}

export default PlannerPage;