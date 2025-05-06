// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './components/Layout';
// import Dashboard from './pages/Dashboard';
// import Subscriptions from './components/dashboard/Subscriptions';
// import History from './components/dashboard/History';
// import Settings from './components/dashboard/Settings';
// import HomePage from './pages/HomePage';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="home" element={<HomePage />} />
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Navigate to="/dashboard" replace />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="subscriptions" element={<Subscriptions />} />
//           <Route path="history" element={<History />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './components/Layout';
import Settings from './components/dashboard/Settings';
import Subscriptions from './components/dashboard/Subscriptions';
import History from './components/dashboard/History';
import HomePage from './pages/HomePage';

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  if (!clientId) {
    console.error('Google Client ID is not set in environment variables');
  }
  console.log('clientId', clientId);
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Layout />}>
              {/* <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              /> */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/subscriptions" 
                element={
                  <ProtectedRoute>
                    <Subscriptions />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/history" 
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
