import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import ChatAssistant from './components/ChatAssistant';
import LanguageSuite from './components/LanguageSuite';
import NewsDashboard from './components/NewsDashboard';
import Announcements from './components/Announcements';
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import { Menu, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentView, setCurrentView] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle Dark Mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('feed');
    setAuthView('login');
    setMobileMenuOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'feed': return <Feed />;
      case 'announcements': return <Announcements />;
      case 'chat': return <ChatAssistant />;
      case 'translator': return <LanguageSuite />;
      case 'news': return <NewsDashboard />;
      case 'settings': return <Settings isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      default: return <Feed />;
    }
  };

  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <Register 
          onRegister={handleLogin} 
          onSwitchToLogin={() => setAuthView('login')} 
        />
      );
    }
    return (
      <Login 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setAuthView('register')} 
      />
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Sidebar for Desktop */}
      <Sidebar currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
            <h1 className="font-bold">Nexus</h1>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 text-white absolute top-16 left-0 w-full z-40 shadow-xl border-t border-slate-700">
            {['feed', 'announcements', 'chat', 'translator', 'news', 'settings'].map((view) => (
              <button
                key={view}
                onClick={() => {
                  setCurrentView(view);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left p-4 hover:bg-slate-700 capitalize border-b border-slate-700"
              >
                {view.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
            {/* Mobile Logout */}
            <button 
                onClick={handleLogout}
                className="w-full text-left p-4 hover:bg-red-900/50 text-red-300 flex items-center gap-2"
            >
                <LogOut size={18} />
                Log Out
            </button>
          </div>
        )}

        {/* View Content */}
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;