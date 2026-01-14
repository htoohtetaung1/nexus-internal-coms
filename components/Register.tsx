import React, { useState } from 'react';
import { UserPlus, ArrowLeft, Building2, Mail, User, Lock, ShieldCheck } from 'lucide-react';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API registration delay
    setTimeout(() => {
      onRegister();
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
           <div className="mb-6">
             <button 
                onClick={onSwitchToLogin}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium transition-colors mb-4"
             >
                <ArrowLeft size={16} />
                Back to Login
             </button>
             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
             <p className="text-slate-500 text-sm mt-1">Join your organization's Nexus workspace.</p>
           </div>

           {/* Form */}
           <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                </div>
                <input 
                  required
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 text-sm" 
                  placeholder="Full Name" 
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                </div>
                <input 
                  required
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 text-sm" 
                  placeholder="Work Email" 
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 size={18} className="text-slate-400" />
                </div>
                <input 
                  required
                  name="companyCode"
                  type="text" 
                  value={formData.companyCode}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 text-sm uppercase placeholder:normal-case" 
                  placeholder="Company Code (e.g. ACME-2024)" 
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                </div>
                <input 
                  required
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 text-sm" 
                  placeholder="Create Password" 
                />
              </div>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                    <span className="animate-pulse">Creating Profile...</span>
                ) : (
                    <>
                        <UserPlus size={18} />
                        Register Account
                    </>
                )}
              </button>
           </form>
        </div>
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} />
            Secure Enterprise Encryption
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;