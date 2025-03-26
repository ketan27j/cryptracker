import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Database, LayoutDashboard, Settings, History, Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderSidebarLinks = () => (
    <nav className="mt-5 px-2">
      <Link
        to="/dashboard"
        className={`group flex items-center px-2 py-2 text-base rounded-md ${
          isActive('/dashboard')
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <LayoutDashboard className="mr-4 h-6 w-6" />
        Dashboard
      </Link>

      <Link
        to="/subscriptions"
        className={`mt-1 group flex items-center px-2 py-2 text-base rounded-md ${
          isActive('/subscriptions')
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Database className="mr-4 h-6 w-6" />
        Subscriptions
      </Link>

      <Link
        to="/history"
        className={`mt-1 group flex items-center px-2 py-2 text-base rounded-md ${
          isActive('/history')
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <History className="mr-4 h-6 w-6" />
        History
      </Link>

      <Link
        to="/settings"
        className={`mt-1 group flex items-center px-2 py-2 text-base rounded-md ${
          isActive('/settings')
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Settings className="mr-4 h-6 w-6" />
        Settings
      </Link>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 min-w-full sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px] xl:min-w-[1280px]">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center px-2 py-2">
                <Database className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Solana Indexer</span>
              </Link>
              
              {/* Mobile Hamburger Menu */}
              <div className="ml-auto absolute right-8 md:hidden">
                <button 
                  onClick={toggleMobileMenu} 
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:w-64 bg-white border-r border-gray-200 min-h-screen">
          {renderSidebarLinks()}
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <aside className="absolute z-50 w-full bg-white border-r border-gray-200 md:hidden">
            {renderSidebarLinks()}
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;