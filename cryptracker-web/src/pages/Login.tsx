import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { Lock, User } from 'lucide-react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const apiHost = 'http://localhost:3004'; // Update with your actual API host

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // const handleGoogleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     // In a real implementation, you would use a proper OAuth flow
  //     // This is a simplified example that would need to be replaced with actual Google OAuth
  //     window.open(`${apiHost}/api/auth/google`, '_self');
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     toast.error('Failed to authenticate with Google');
  //     setIsLoading(false);
  //   }
  // };

  // This function would be called by the OAuth callback
  // const handleAuthCallback = async (code: string) => {
  //   try {
  //     const response = await axios.post(`${apiHost}/api/auth/callback`, { code });
      
  //     if (response.data.token) {
  //       // Store the token in localStorage
  //       localStorage.setItem('auth_token', response.data.token);
  //       localStorage.setItem('user_info', JSON.stringify(response.data.user));
        
  //       toast.success('Login successful!');
  //       navigate('/dashboard');
  //     } else {
  //       toast.error('Authentication failed');
  //     }
  //   } catch (error) {
  //     console.error('Auth callback error:', error);
  //     toast.error('Authentication failed');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSuccess = async (credentialResponse: any) => {
    console.log(credentialResponse);
    // Send `credentialResponse.credential` to your backend

    const response = await fetch(`${apiHost}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: credentialResponse.credential,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with backend');
    }

    const data = await response.json();
    console.log('login data', data);
    // Store the authentication token and user ID from your backend
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userId', data.userId);
    console.log('userId', data.userId);
    navigate('/dashboard');
    console.log('navigated');
    window.location.href = '/dashboard';
    // setToken(data.token);
    // setUserId(data.userId);
    
    return data;
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  // Check for auth callback in URL
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get('code');
    
  //   if (code) {
  //     handleAuthCallback(code);
  //   }
  // }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <ToastContainer position="top-right" autoClose={5000} />
      
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">CrypTracker</h2>
          <p className="mt-2 text-sm text-gray-600">
            Monitor your crypto assets and blockchain metrics
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Lock className="h-6 w-6 text-blue-500" />
                <span className="text-gray-700">Secure Authentication</span>
              </div>
            </div>
            
            {/* <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FcGoogle className="h-5 w-5" />
              </span>
              {isLoading ? 'Authenticating...' : 'Sign in with Google'}
            </button> */}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-center">
          <div className="text-sm">
            <span className="text-gray-500">Need help?</span>{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
