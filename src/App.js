import './App.css';
import 'leaflet/dist/leaflet.css';
import MapComponent from "./components/MapComponent";
import FriendInputComponent from "./components/FriendInputComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        I will help you catch your train :)
      </header>

      <div className="Main-body">
          <div>
              <FriendInputComponent></FriendInputComponent>
          </div>
          <div className="MapComponent">
            <MapComponent></MapComponent>
          </div>
      </div>

      <footer className="App-footer">
        <p>Made by Enes</p>
      </footer>
    </div>
  );
}

export default App;
