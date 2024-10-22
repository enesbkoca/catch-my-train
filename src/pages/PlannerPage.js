import React from 'react';
import FriendInputComponent from "../components/FriendInputComponent";
import MapComponent from "../components/MapComponent";
import {MapProvider} from "../components/MapContext";

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