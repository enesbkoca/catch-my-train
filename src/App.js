import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/App.css';
import 'leaflet/dist/leaflet.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import JourneyPage from "./pages/JourneyPage";

function App() {

  return (
      <Router>

          <div className="App">
            <Header/>

            <main>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/planner" element={<PlannerPage/>}/>
                  <Route path="/journey/:id" element={<JourneyPage/>}/>
              </Routes>
            </main>

            <Footer/>

          </div>
      </Router>

  );
}

export default App;
