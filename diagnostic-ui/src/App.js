import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardWrapper from './components/DashboardWrapper';
import DiagnosticTabs from './components/Tabs';
import SimulationAnalysisPage from './components/SimulationAnalysisPage';

function App() {
  
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardWrapper content={<DiagnosticTabs/>}/>
            }
          />
          <Route
            path="/past-test"
            element={
              <DashboardWrapper content={<SimulationAnalysisPage/>}/>
            }
          />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
