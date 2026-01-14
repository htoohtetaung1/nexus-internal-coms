import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
  onSwitchToAdmin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister, onSwitchToAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    setIsLoading(true);
    // Simulate network delay for realism
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="p-8">
           {/* Header */}
           <div className="flex flex-col items-center mb-8">
             <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg transform rotate-3">
                N
             </div>
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Nexus</h1>
             <p className="text-slate-500 text-center mt-2 font-medium">Internal Communications Platform</p>
           </div>

           {/* Form (Visual only) */}
           <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Work Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50" 
                  placeholder="name@company.com" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50" 
                  placeholder="••••••••" 
                />
              </div>
              
              <button className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-lg hover:bg-slate-900 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-2">
                <Lock size={18} />
                Secure Sign In
              </button>
           </div>

           <div className="mt-6 text-center">
             <p className="text-slate-500 text-sm">
               Don't have an account?{' '}
               <button 
                 onClick={onSwitchToRegister}
                 className="text-blue-600 font-bold hover:underline"
               >
                 Register here
               </button>
             </p>
           </div>

           <div className="my-6 flex items-center gap-4">
             <div className="h-px bg-slate-200 flex-1"></div>
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Development Access</span>
             <div className="h-px bg-slate-200 flex-1"></div>
           </div>

           <button 
             onClick={handleDemoLogin}
             disabled={isLoading}
             className="group w-full bg-blue-50 text-blue-700 font-bold py-3.5 rounded-lg hover:bg-blue-100 transition-all border border-blue-100 flex items-center justify-center gap-2"
           >
             {isLoading ? (
               <span className="animate-pulse">Authenticating...</span>
             ) : (
               <>
                 <span>Launch Demo</span>
                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </>
             )}
           </button>
        </div>
        <div className="bg-slate-50 p-4 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck size={14} />
            SSO Secured
          </p>
          <button 
            onClick={onSwitchToAdmin}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
          >
            <Shield size={12} />
            Admin Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login;
