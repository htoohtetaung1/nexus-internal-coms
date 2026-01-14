import React from 'react';
import { LayoutDashboard, Radio, MessageSquare, Languages, Newspaper, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  const menuItems = [
    { id: 'feed', label: 'Company Feed', icon: LayoutDashboard },
    { id: 'announcements', label: 'Alerts & Comms', icon: Radio },
    { id: 'chat', label: 'AI Companion', icon: MessageSquare },
    { id: 'translator', label: 'Language Suite', icon: Languages },
    { id: 'news', label: 'Intel Dashboard', icon: Newspaper },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 dark:bg-slate-950 text-slate-300 h-screen sticky top-0 border-r border-slate-800 transition-colors duration-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/20">N</div>
          <h1 className="text-xl font-bold text-white tracking-tight">Nexus</h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'hover:bg-slate-800 hover:text-white dark:hover:bg-slate-900'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-800 space-y-2">
        <button 
          onClick={() => setView('settings')}
          className={`flex items-center gap-3 px-4 py-2 hover:text-white transition-colors w-full rounded-md hover:bg-slate-800 dark:hover:bg-slate-900 ${currentView === 'settings' ? 'text-white bg-slate-800' : 'text-slate-400'}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors w-full rounded-md hover:bg-slate-800 dark:hover:bg-slate-900"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>

        <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-3">
          <img 
            src="https://picsum.photos/40/40" 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-slate-700" 
          />
          <div>
            <p className="text-sm font-semibold text-white">Alex Morgan</p>
            <p className="text-xs text-slate-500">Product Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;