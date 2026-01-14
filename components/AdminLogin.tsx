import React, { useState } from 'react';
import { ShieldAlert, ArrowLeft, Lock, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onSwitchToUserLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onSwitchToUserLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth check
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration - darker/redder for admin */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-red-900/20 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-slate-800 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="p-8">
           {/* Header */}
           <div className="mb-8">
             <button 
                onClick={onSwitchToUserLogin}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors mb-6"
             >
                <ArrowLeft size={16} />
                Back to User Login
             </button>
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                    <ShieldAlert size={24} />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
             </div>
             <p className="text-slate-400 text-sm">Restricted access. Authorized personnel only.</p>
           </div>

           {/* Form */}
           <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Admin ID</label>
                <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                    required
                    type="text" 
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white placeholder:text-slate-600" 
                    placeholder="admin.sys" 
                    />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Access Key</label>
                 <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                    required
                    type="password" 
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white placeholder:text-slate-600" 
                    placeholder="••••••••••••" 
                    />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 text-white font-bold py-3.5 rounded-lg hover:bg-red-700 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 mt-6"
              >
                {isLoading ? (
                    <span className="animate-pulse">Verifying Credentials...</span>
                ) : (
                    <>
                        <Lock size={18} />
                        Authenticate
                    </>
                )}
              </button>
           </form>
        </div>
        <div className="bg-slate-950/50 p-4 text-center border-t border-slate-800">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldAlert size={14} />
            Access monitored and logged
          </p>
        </div>
      </div>
    </div>
  )
}

function UserIcon(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

export default AdminLogin;
