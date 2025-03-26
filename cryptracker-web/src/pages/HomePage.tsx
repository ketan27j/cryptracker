import { useState } from 'react';
import { Search, Database, Activity, Shield, ArrowRight, Github } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">SolanaIndexer</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700">Home</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Features</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Documentation</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Pricing</a>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleLogin}
                className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors mr-2"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Login</h2>
              <button onClick={toggleLogin} className="text-gray-400 hover:text-white">
                &times;
              </button>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
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
            <div className="mt-4 text-center text-gray-400 text-sm">
              Don't have an account? <button onClick={toggleSignup} className="text-blue-400 hover:underline">Sign up</button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sign Up</h2>
              <button onClick={toggleSignup} className="text-gray-400 hover:text-white">
                &times;
              </button>
            </div>
            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Password</label>
                <input 
                  type="password" 
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
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
            <div className="mt-4 text-center text-gray-400 text-sm">
              Already have an account? <button onClick={toggleLogin} className="text-blue-400 hover:underline">Login</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Seamless Blockchain Indexing</span>
            <span className="block text-blue-400 mt-2">for Developers</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
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
      <div className="py-12 bg-gray-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">Core Features</h2>
            <p className="mt-4 text-lg text-gray-300">
              Everything you need to seamlessly index Solana blockchain data
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Database size={40} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Postgres Integration</h3>
              <p className="text-gray-300 text-center">
                Connect directly to your database and start indexing blockchain data instantly.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Search size={40} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Customizable Indexing</h3>
              <p className="text-gray-300 text-center">
                Choose exactly what blockchain data you want to index and track.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Activity size={40} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Real-time Updates</h3>
              <p className="text-gray-300 text-center">
                Leverage Helius webhooks for seamless real-time data synchronization.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Shield size={40} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Secure & Reliable</h3>
              <p className="text-gray-300 text-center">
                Secure credential management and reliable infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold">Indexing Use Cases</h2>
          <p className="mt-4 text-lg text-gray-300">
            Track exactly what matters to your application
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-400">NFT Market Data</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Track current bids on specific NFT collections</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Monitor real-time floor prices of NFTs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Index historical sales data for market analysis</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-400">DeFi Analytics</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Track token availability for borrowing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Monitor token prices across multiple platforms</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Index liquidity pool data for market insights</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Transaction Monitoring</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Track transactions for specific wallets</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Monitor program interactions on-chain</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Index transaction history for specific accounts</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Governance & DAO Tracking</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Track DAO proposals and voting activity</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Monitor governance token distribution</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Index treasury activities and fund movements</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold">How It Works</h2>
            <p className="mt-4 text-lg text-gray-300">
              Three simple steps to start indexing blockchain data
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Database</h3>
              <p className="text-gray-300">
                Enter your Postgres database credentials to establish a secure connection.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Select Data to Index</h3>
              <p className="text-gray-300">
                Choose from predefined categories or create custom indexing rules.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Start Indexing</h3>
              <p className="text-gray-300">
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
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Examples</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white flex items-center"><Github size={16} className="mr-2" /> GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 SolanaIndexer. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}