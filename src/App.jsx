import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";

// Placeholder imports for pages (to be created)
const Home = React.lazy(() => import("./pages/Home"));
const CognitiveAssessments = React.lazy(() => import("./pages/CognitiveAssessments"));
const VoiceAnalysis = React.lazy(() => import("./pages/VoiceAnalysis"));
const DashboardAlerts = React.lazy(() => import("./pages/DashboardAlerts"));

function App() {
  return (
    <Router>
      <Navbar />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessments" element={<CognitiveAssessments />} />
          <Route path="/voice" element={<VoiceAnalysis />} />
          <Route path="/dashboard" element={<DashboardAlerts />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
