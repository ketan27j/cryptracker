import React, { useState } from 'react';
import { 
  Activity, Server, Zap, Database, Cpu, Cloud, Layers, Settings, Bell, 
  PieChart, BarChart2, TrendingUp, Filter, Sliders, Grid, Target, Maximize2, Link2
} from 'lucide-react';

const BlockchainMetricsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tokens');
  const [selectedAlert, setSelectedAlert] = useState('Bitcoin');
  const [selectedMetric, setSelectedMetric] = useState('Difficulty');
  const [direction, setDirection] = useState('above');
  const [threshold, setThreshold] = useState('000000');

  const tabs = [
    { icon: <Activity className="w-5 h-5 mr-2" />, name: 'Tokens' },
    { icon: <Server className="w-5 h-5 mr-2" />, name: 'Blockchain' },
    { icon: <Zap className="w-5 h-5 mr-2" />, name: 'Metrics' },
    { icon: <Database className="w-5 h-5 mr-2" />, name: 'Transactions' },
    { icon: <Cpu className="w-5 h-5 mr-2" />, name: 'Mining' },
    { icon: <Cloud className="w-5 h-5 mr-2" />, name: 'Network' },
    { icon: <Layers className="w-5 h-5 mr-2" />, name: 'Blocks' },
  ];

  const tabContents = {
    'Tokens': () => (
      <div>
         <h1 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
           <Bell className="mr-3 text-blue-600" /> Blockchain Metric Alert
         </h1>

         <p className="text-gray-600 mb-6">Monitor on-chain metrics tied to the BTC & ETH blockchains.</p>

         <div className="space-y-4">
           <div className="grid grid-cols-3 gap-4">
             {/* Alert Type */}
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Send me an</label>
               <div className="relative">
                 <select 
                   className="w-full border border-blue-200 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-300"
                 >
                   <option>Email</option>
                   <option>SMS</option>
                   <option>Push Notification</option>
                 </select>
               </div>
             </div>

             {/* Blockchain */}
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Blockchain</label>
               <div className="relative">
                 <select 
                   value={selectedAlert}
                   onChange={(e) => setSelectedAlert(e.target.value)}
                   className="w-full border border-blue-200 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-300"
                 >
                   <option value="Bitcoin">Bitcoin</option>
                   <option value="Ethereum">Ethereum</option>
                 </select>
               </div>
             </div>

             {/* Metric */}
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
               <div className="relative">
                 <select 
                   value={selectedMetric}
                   onChange={(e) => setSelectedMetric(e.target.value)}
                   className="w-full border border-blue-200 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-300"
                 >
                   <option value="Difficulty">Difficulty</option>
                   <option value="BlockHeight">Block Height</option>
                   <option value="TransactionsPerBlock">Transactions per Block</option>
                   <option value="BlockSize">Block Size</option>
                 </select>
               </div>
             </div>
           </div>

           {/* Condition */}
           <div className="grid grid-cols-3 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
               <select 
                 value={direction}
                 onChange={(e) => setDirection(e.target.value)}
                 className="w-full border border-blue-200 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-300"
               >
                 <option value="above">goes above</option>
                 <option value="below">goes below</option>
               </select>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Threshold</label>
               <input 
                 type="text" 
                 value={threshold}
                 onChange={(e) => setThreshold(e.target.value)}
                 className="w-full border border-blue-200 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-300"
               />
             </div>
           </div>

           {/* Current Reference */}
           <div className="bg-blue-50 p-3 rounded-lg text-sm text-gray-700">
             For reference, the BTC Difficulty is currently 113.7575 trillion.
           </div>

           {/* Set Alert Button */}
           <button 
             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
           >
             Set Alert
           </button>
         </div>
         </div>
    ),
    'Blockchain': () => (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">Blockchain Network Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Blockchain</label>
              <select className="w-full border border-blue-200 rounded-lg py-2 px-3">
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>Litecoin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Network Status</label>
              <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                Active and Stable
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    // ... (rest of the tabContents remain the same as in the previous implementation)
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Horizontal Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-2" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  flex items-center px-4 py-2 rounded-t-lg transition-colors
                  ${activeTab === tab.name 
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50'}
                `}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-xl border border-blue-100 p-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-6">
            {activeTab} Section
          </h1>

          {/* Dynamic Tab Content */}
          {tabContents[activeTab]()}
        </div>
      </div>
    </div>
  );
};

export default BlockchainMetricsDashboard;