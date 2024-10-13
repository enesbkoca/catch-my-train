import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import 'leaflet/dist/leaflet.css';

import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import JourneyPage from "./pages/JourneyPage";

function App() {

  return (

      <Router>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/planner" element={<PlannerPage/>}/>
              <Route path="/journey" element={<JourneyPage/>}/>
          </Routes>
      </Router>

    // <div className="App">
    //   <header className="header">
    //     I will help you catch your train :)
    //   </header>
    //
    //
    //
    //   <footer className="footer">
    //     <p>Made by Enes</p>
    //   </footer>
    // </div>

  );
}

export default App;
