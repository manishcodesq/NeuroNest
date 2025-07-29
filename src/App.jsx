import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './i18n'; // Import i18n configuration

// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

// Lazy loaded pages
const Home = React.lazy(() => import('./pages/Home'));
const CognitiveAssessments = React.lazy(() => import('./pages/CognitiveAssessments'));
const VoiceAnalysis = React.lazy(() => import('./pages/VoiceAnalysis'));
const DashboardAlerts = React.lazy(() => import('./pages/DashboardAlerts'));
const MemoryGames = React.lazy(() => import("./pages/MemoryGames"));
const FocusExercises = React.lazy(() => import("./pages/FocusExercises"));
const WordActivities = React.lazy(() => import("./pages/WordActivities"));
const VisualPuzzles = React.lazy(() => import("./pages/VisualPuzzles"));

// Create theme with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#9575cd',
      light: '#c7a4ff',
      dark: '#65499c',
    },
    secondary: {
      main: '#90caf9',
      light: '#c3fdff',
      dark: '#5d99c6',
    },
    background: {
      default: '#fcfcff',
      paper: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          textTransform: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

// Loading component with NeuroNest styling
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontFamily: 'Poppins',
    fontSize: '1.2rem',
    color: '#9575cd'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route 
              path="/cognitive-assessment" 
              element={
                <ProtectedRoute>
                  <CognitiveAssessments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/voice" 
              element={
                <ProtectedRoute>
                  <VoiceAnalysis />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardAlerts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/memory-games" 
              element={
                <ProtectedRoute>
                  <MemoryGames />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/focus-exercises" 
              element={
                <ProtectedRoute>
                  <FocusExercises />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/word-activities" 
              element={
                <ProtectedRoute>
                  <WordActivities />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/visual-puzzles" 
              element={
                <ProtectedRoute>
                  <VisualPuzzles />
                </ProtectedRoute>
              } 
            />
            {/* Catch-all route for 404 */}
            <Route 
              path="*" 
              element={
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '50vh',
                  fontFamily: 'Poppins',
                  textAlign: 'center'
                }}>
                  <h2 style={{ color: '#9575cd', marginBottom: '1rem' }}>404 - Page Not Found</h2>
                  <p style={{ color: '#757575' }}>The page you're looking for doesn't exist.</p>
                </div>
              } 
            />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
