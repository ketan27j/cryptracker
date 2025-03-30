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


// import React from 'react';
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

function App() {
  return (
    <GoogleOAuthProvider clientId="935241688123-bl4lfpm43k7hguhg8aht2p5c753nihiu.apps.googleusercontent.com">
      <Router>
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
