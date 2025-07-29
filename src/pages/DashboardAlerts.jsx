import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Grid, Paper, Stack, Chip, Button } from "@mui/material";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MicIcon from '@mui/icons-material/Mic';
import ShareIcon from '@mui/icons-material/Share';
import CircleIcon from '@mui/icons-material/Circle';
import { useTranslation } from 'react-i18next';

const YourComponent = () => {
  const { t } = useTranslation();
  
  // Now replace hardcoded text like:
  // "Welcome to NeuroNest" → {t('home.welcome')}
  // "Get Started" → {t('home.getStarted')}
  // etc.
}
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RealTimeDashboard = () => {
  // Real-time state management
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Memory',
        data: [88, 87, 85, 86, 87, 85],
        borderColor: '#9575cd',
        backgroundColor: 'rgba(149, 117, 205, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Attention',
        data: [89, 88, 92, 91, 90, 92],
        borderColor: '#90caf9',
        backgroundColor: 'rgba(144, 202, 249, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Language',
        data: [89, 90, 89, 86, 90, 89],
        borderColor: '#81c784',
        backgroundColor: 'rgba(129, 199, 132, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  const [recentAssessments, setRecentAssessments] = useState([
    {
      title: 'Memory Assessment',
      date: '2024-01-28',
      score: '88%',
      status: 'Completed',
      icon: <PsychologyIcon sx={{ color: '#9575cd', fontSize: 24 }} />,
      color: '#ede7f6',
    },
    {
      title: 'Voice Analysis',
      date: '2024-01-26',
      score: '92%',
      status: 'Completed',
      icon: <MicIcon sx={{ color: '#90caf9', fontSize: 24 }} />,
      color: '#e3f2fd',
    },
    {
      title: 'Attention Test',
      date: '2024-01-24',
      score: '85%',
      status: 'Completed',
      icon: <VisibilityIcon sx={{ color: '#90caf9', fontSize: 24 }} />,
      color: '#e3f2fd',
    },
    {
      title: 'Language Skills',
      date: '2024-01-22',
      score: '90%',
      status: 'Completed',
      icon: <AutoStoriesIcon sx={{ color: '#81c784', fontSize: 24 }} />,
      color: '#e8f5e9',
    },
  ]);

  const [alerts, setAlerts] = useState([
    {
      message: 'Your cognitive scores are stable this month. Keep up the great work!',
      date: '2024-01-28',
      type: 'success',
      icon: <NotificationsIcon sx={{ color: '#4caf50', fontSize: 20 }} />,
      bgcolor: '#e8f5e9',
      borderColor: '#c8e6c9',
    },
    {
      message: 'Time for your weekly voice analysis. It only takes a few minutes.',
      date: '2024-01-27',
      type: 'warning',
      icon: <AccessTimeIcon sx={{ color: '#ff9800', fontSize: 20 }} />,
      bgcolor: '#fff3e0',
      borderColor: '#ffcc02',
    },
  ]);

  const [riskData, setRiskData] = useState({
    lowRisk: 75,
    mediumRisk: 20,
    highRisk: 5,
  });

  const socketRef = useRef(null);
  const intervalRef = useRef(null);

  // WebSocket connection setup
  useEffect(() => {
    // Initialize WebSocket connection
    const connectWebSocket = () => {
      try {
        socketRef.current = new WebSocket('ws://localhost:8080');
        
        socketRef.current.onopen = () => {
          console.log('WebSocket connected');
          setIsConnected(true);
          setConnectionStatus('Connected');
        };

        socketRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            handleRealtimeUpdate(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        socketRef.current.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
          setConnectionStatus('Disconnected');
          // Attempt to reconnect after 3 seconds
          setTimeout(connectWebSocket, 3000);
        };

        socketRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('Error');
        };
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        setConnectionStatus('Failed');
      }
    };

    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // Fallback: Polling for updates every 30 seconds
  useEffect(() => {
    const startPolling = () => {
      intervalRef.current = setInterval(() => {
        if (!isConnected) {
          // Fetch updates via HTTP when WebSocket is not available
          fetchLatestData();
        }
        setLastUpdate(new Date());
      }, 30000); // 30 seconds
    };

    startPolling();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isConnected]);

  // Handle real-time updates from WebSocket
  const handleRealtimeUpdate = (data) => {
    setLastUpdate(new Date());
    
    switch (data.type) {
      case 'cognitive_data':
        updateChartData(data.payload);
        break;
      case 'new_assessment':
        addNewAssessment(data.payload);
        break;
      case 'risk_update':
        setRiskData(data.payload);
        break;
      case 'new_alert':
        addNewAlert(data.payload);
        break;
      default:
        console.log('Unknown data type:', data.type);
    }
  };

  // Update chart data with new cognitive scores
  const updateChartData = (newData) => {
    setChartData(prevData => {
      const newChartData = { ...prevData };
      
      // Add new month and data point
      if (newData.labels && newData.data) {
        newChartData.labels = [...prevData.labels.slice(1), newData.labels];
        
        newChartData.datasets = prevData.datasets.map((dataset, index) => ({
          ...dataset,
          data: [...dataset.data.slice(1), newData.data[index]]
        }));
      }
      
      return newChartData;
    });
  };

  // Add new assessment to the list
  const addNewAssessment = (newAssessment) => {
    setRecentAssessments(prev => [newAssessment, ...prev.slice(0, 3)]);
  };

  // Add new alert
  const addNewAlert = (newAlert) => {
    setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
  };

  // Fallback HTTP polling function
  const fetchLatestData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/dashboard-data');
      const data = await response.json();
      
      if (data.cognitive_data) updateChartData(data.cognitive_data);
      if (data.assessments) setRecentAssessments(data.assessments);
      if (data.alerts) setAlerts(data.alerts);
      if (data.risk_data) setRiskData(data.risk_data);
      
    } catch (error) {
      console.error('Error fetching latest data:', error);
    }
  };

  // Simulate real-time data (for demo purposes)
  const simulateRealtimeData = () => {
    const simulatedData = {
      type: 'cognitive_data',
      payload: {
        labels: 'Jul',
        data: [
          Math.floor(Math.random() * 10) + 85, // Memory
          Math.floor(Math.random() * 10) + 85, // Attention  
          Math.floor(Math.random() * 10) + 85, // Language
        ]
      }
    };
    handleRealtimeUpdate(simulatedData);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Poppins',
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 70,
        max: 100,
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          font: {
            family: 'Poppins',
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          font: {
            family: 'Poppins',
          },
        },
      },
    },
  };

  return (
    <Box sx={{ bgcolor: '#fcfcff', minHeight: '100vh', py: 6, px: 3, width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      {/* Header with Real-time Status */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, maxWidth: 1200, mx: 'auto' }}>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', mb: 1 }}>
            Real-Time Dashboard
          </Typography>
          <Typography variant="h5" sx={{ color: '#9575cd', fontWeight: 500, fontFamily: 'Poppins' }}>
            Your cognitive health overview - Live Updates
          </Typography>
        </Box>
        
        {/* Connection Status */}
        <Paper elevation={0} sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: isConnected ? '#e8f5e9' : '#ffebee',
          border: `1px solid ${isConnected ? '#c8e6c9' : '#ffcdd2'}`,
        }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CircleIcon sx={{ 
              fontSize: 12, 
              color: isConnected ? '#4caf50' : '#f44336',
              animation: isConnected ? 'pulse 2s infinite' : 'none',
            }} />
            <Typography sx={{ 
              fontFamily: 'Poppins', 
              fontSize: '0.9rem', 
              fontWeight: 600,
              color: isConnected ? '#2e7d32' : '#c62828'
            }}>
              {connectionStatus}
            </Typography>
          </Stack>
          <Typography sx={{ 
            fontFamily: 'Poppins', 
            fontSize: '0.8rem', 
            color: '#757575',
            mt: 0.5
          }}>
            Last updated: {lastUpdate.toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>

      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Real-Time Cognitive Trends Chart */}
          <Paper elevation={0} sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#fff',
            boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
            border: '1.5px solid #e0e0e0',
            mb: 4,
            position: 'relative',
          }}>
            {/* Live indicator */}
            <Box sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <CircleIcon sx={{ 
                fontSize: 8, 
                color: '#f44336',
                animation: 'pulse 1s infinite'
              }} />
              <Typography sx={{ 
                fontFamily: 'Poppins', 
                fontSize: '0.8rem', 
                color: '#f44336',
                fontWeight: 600
              }}>
                LIVE
              </Typography>
            </Box>
            
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', mb: 3 }}>
              Real-Time Cognitive Trends
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line data={chartData} options={chartOptions} />
            </Box>
            
            {/* Demo button for testing */}
            <Button 
              onClick={simulateRealtimeData}
              sx={{ 
                mt: 2, 
                fontSize: '0.8rem',
                color: '#9575cd',
                textTransform: 'none'
              }}
            >
              Simulate Real-time Update
            </Button>
          </Paper>

          {/* Recent Assessments with real-time updates */}
          <Paper elevation={0} sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#fff',
            boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
            border: '1.5px solid #e0e0e0',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', mb: 3 }}>
              Recent Assessments
            </Typography>
            <Stack spacing={2}>
              {recentAssessments.map((assessment, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderRadius: 3,
                  bgcolor: assessment.color,
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {assessment.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontFamily: 'Poppins', color: '#222', fontSize: '1rem' }}>
                        {assessment.title}
                      </Typography>
                      <Typography sx={{ color: '#757575', fontSize: '0.9rem', fontFamily: 'Poppins' }}>
                        {assessment.date}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', fontSize: '1.1rem' }}>
                      {assessment.score}
                    </Typography>
                    <Chip
                      label={assessment.status}
                      size="small"
                      sx={{
                        bgcolor: '#e8f5e9',
                        color: '#4caf50',
                        fontWeight: 600,
                        fontFamily: 'Poppins',
                        fontSize: '0.85rem'
                      }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Real-time Risk Distribution */}
          <Paper elevation={0} sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#fff',
            boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
            border: '1.5px solid #e0e0e0',
            mb: 4,
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', mb: 3 }}>
              Risk Distribution
            </Typography>
            
            {/* Animated Pie Chart Visual */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                <Box sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: `conic-gradient(#4caf50 0deg ${riskData.lowRisk * 3.6}deg, #ff9800 ${riskData.lowRisk * 3.6}deg ${(riskData.lowRisk + riskData.mediumRisk) * 3.6}deg, #f44336 ${(riskData.lowRisk + riskData.mediumRisk) * 3.6}deg 360deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 1s ease-in-out',
                }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#4caf50', fontFamily: 'Poppins' }}>
                      {riskData.lowRisk}%
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#4caf50', fontFamily: 'Poppins' }}>
                      Low Risk
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Risk Legend */}
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4caf50' }} />
                  <Typography sx={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: '#757575' }}>
                    Low Risk
                  </Typography>
                </Stack>
                <Typography sx={{ fontWeight: 600, fontFamily: 'Poppins', fontSize: '0.9rem' }}>
                  {riskData.lowRisk}%
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff9800' }} />
                  <Typography sx={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: '#757575' }}>
                    Medium Risk
                  </Typography>
                </Stack>
                <Typography sx={{ fontWeight: 600, fontFamily: 'Poppins', fontSize: '0.9rem' }}>
                  {riskData.mediumRisk}%
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f44336' }} />
                  <Typography sx={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: '#757575' }}>
                    High Risk
                  </Typography>
                </Stack>
                <Typography sx={{ fontWeight: 600, fontFamily: 'Poppins', fontSize: '0.9rem' }}>
                  {riskData.highRisk}%
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          {/* Real-time Alerts */}
          <Paper elevation={0} sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#fff',
            boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
            border: '1.5px solid #e0e0e0',
            mb: 4,
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', mb: 3 }}>
              Live Alerts
            </Typography>
            <Stack spacing={2}>
              {alerts.map((alert, index) => (
                <Box key={index} sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: alert.bgcolor,
                  border: `1px solid ${alert.borderColor}`,
                  animation: index === 0 ? 'slideIn 0.5s ease-out' : 'none',
                }}>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    {alert.icon}
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontFamily: 'Poppins', color: '#222', fontSize: '0.9rem' }}>
                        {alert.message}
                      </Typography>
                      <Typography sx={{ color: '#757575', fontSize: '0.8rem', fontFamily: 'Poppins', mt: 0.5 }}>
                        {alert.date}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Quick Actions */}
          <Paper elevation={0} sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#fff',
            boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
            border: '1.5px solid #e0e0e0',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#222', mb: 3 }}>
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{
                  bgcolor: '#9575cd',
                  color: '#fff',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  borderRadius: 3,
                  py: 1.5,
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#7e57c2' },
                }}
                fullWidth
              >
                Start New Assessment
              </Button>
              <Button
                variant="outlined"
                startIcon={<MicIcon />}
                sx={{
                  borderColor: '#9575cd',
                  color: '#9575cd',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  borderRadius: 3,
                  py: 1.5,
                  bgcolor: '#fff',
                  '&:hover': { bgcolor: '#ede7f6' },
                }}
                fullWidth
              >
                Record Voice Sample
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                sx={{
                  borderColor: '#9575cd',
                  color: '#9575cd',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  borderRadius: 3,
                  py: 1.5,
                  bgcolor: '#fff',
                  '&:hover': { bgcolor: '#ede7f6' },
                }}
                fullWidth
              >
                Share with Doctor
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        @keyframes slideIn {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default RealTimeDashboard;
