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
const MemoryGames = React.lazy(() => import("./pages/MemoryGames"));
const FocusExercises = React.lazy(() => import("./pages/FocusExercises"));
const WordActivities = React.lazy(() => import("./pages/WordActivities"));
const VisualPuzzles = React.lazy(() => import("./pages/VisualPuzzles"));

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
          <Route path="/memory-games" element={<MemoryGames />} />
          <Route path="/focus-exercises" element={<FocusExercises />} />
          <Route path="/word-activities" element={<WordActivities />} />
          <Route path="/visual-puzzles" element={<VisualPuzzles />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
