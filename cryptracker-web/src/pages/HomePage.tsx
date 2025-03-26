import { useState } from 'react';
import { Search, Database, Activity, Shield, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    if (isSignupOpen) setIsSignupOpen(false);
  };

  const toggleSignup = () => {
    setIsSignupOpen(!isSignupOpen);
    if (isLoginOpen) setIsLoginOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { loginEmail, loginPassword });
    // Add login logic here
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted', { signupEmail, signupPassword });
    // Add signup logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center px-2 py-2">
                  <Database className="h-8 w-8 text-indigo-600" />
                  <span className="ml-1 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">Solana Indexer</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">Home</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">Features</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">Documentation</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">Pricing</a>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleLogin}
                className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors mr-2"
              >
                Login
              </button>
              <button 
                onClick={toggleSignup}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Login</h2>
              <button onClick={toggleLogin} className="text-gray-600 hover:text-gray-900">
                &times;
              </button>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-2 bg-gray-50 rounded border border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2 bg-gray-50 rounded border border-gray-300 text-gray-900"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center text-gray-600 text-sm">
              Don't have an account? <button onClick={toggleSignup} className="text-blue-600 hover:underline">Sign up</button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Sign Up</h2>
              <button onClick={toggleSignup} className="text-gray-600 hover:text-gray-900">
                &times;
              </button>
            </div>
            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full p-2 bg-gray-50 rounded border border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full p-2 bg-gray-50 rounded border border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  className="w-full p-2 bg-gray-50 rounded border border-gray-300 text-gray-900"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-center text-gray-600 text-sm">
              Already have an account? <button onClick={toggleLogin} className="text-blue-600 hover:underline">Login</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="block text-gray-900">Seamless Blockchain Indexing</span>
            <span className="block text-blue-600 mt-2">for Developers</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-600">
            Index Solana blockchain data directly into your Postgres database without managing your own infrastructure.
          </p>
          <div className="mt-10 flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors flex items-center">
              Get Started <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Core Features</h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to seamlessly index Solana blockchain data
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Database size={40} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-gray-900">Postgres Integration</h3>
              <p className="text-gray-600 text-center">
                Connect directly to your database and start indexing blockchain data instantly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Search size={40} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-gray-900">Customizable Indexing</h3>
              <p className="text-gray-600 text-center">
                Choose exactly what blockchain data you want to index and track.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Activity size={40} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-gray-900">Real-time Updates</h3>
              <p className="text-gray-600 text-center">
                Leverage Helius webhooks for seamless real-time data synchronization.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Shield size={40} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-gray-900">Secure & Reliable</h3>
              <p className="text-gray-600 text-center">
                Secure credential management and reliable infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Indexing Use Cases</h2>
          <p className="mt-4 text-lg text-gray-600">
            Track exactly what matters to your application
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">NFT Market Data</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Track current bids on specific NFT collections</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Monitor real-time floor prices of NFTs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Index historical sales data for market analysis</span>
              </li>
            </ul>
          </div>

          {/* Rest of the sections follow similar light mode color scheme... */}
          {/* I'll continue with the same pattern of light backgrounds, darker text */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">DeFi Analytics</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Track token availability for borrowing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Monitor token prices across multiple platforms</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Index liquidity pool data for market insights</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Transaction Monitoring</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Track transactions for specific wallets</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Monitor program interactions on-chain</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Index transaction history for specific accounts</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Governance & DAO Tracking</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Track DAO proposals and voting activity</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Monitor governance token distribution</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Index treasury activities and fund movements</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to start indexing blockchain data
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Connect Database</h3>
              <p className="text-gray-600">
                Enter your Postgres database credentials to establish a secure connection.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Select Data to Index</h3>
              <p className="text-gray-600">
                Choose from predefined categories or create custom indexing rules.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Start Indexing</h3>
              <p className="text-gray-600">
                Our platform automatically starts filling your database with real-time blockchain data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-10 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to Start Indexing?</h2>
            <p className="mt-4 text-xl text-white opacity-90">
              Join developers who are building the next generation of blockchain applications.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md text-base font-medium transition-colors">
                Sign Up for Free
              </button>
              <button className="bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-md text-base font-medium transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">API</a></li>
              </ul>
            </div>
            {/* Rest of the footer columns follow the same pattern */}
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Examples</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 flex items-center"><Github size={16} className="mr-2" /> GitHub</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Discord</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2025 SolanaIndexer. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}