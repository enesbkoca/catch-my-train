import React, { useEffect, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import MapComponent from "./components/MapComponent";
import FriendInputComponent from "./components/FriendInputComponent";
import { MapProvider } from './components/MapContext';
import GetStations from './utils/fetchStations';

function App() {
    const [stations, setStations] = useState([])

    useEffect(() => {
        const fetchStations = async () => {
            const stationsData = await GetStations();
            setStations(stationsData);
        };

        fetchStations();
    }, []);


  return (
      <MapProvider>
        <div className="App">
          <header className="header">
            I will help you catch your train :)
          </header>

          <div className="mainbody">
              <div>
                  <FriendInputComponent stations={stations}></FriendInputComponent>
              </div>
              <div className="MapComponent">
                <MapComponent></MapComponent>
              </div>
          </div>

          <footer className="footer">
            <p>Made by Enes</p>
          </footer>
        </div>
      </MapProvider>
  );
}

export default App;
