import React, { useRef, useState } from 'react';
import { Moon, Sun, Camera, User, Mail, Building, Save, Lock, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, toggleTheme }) => {
  const [profileImage, setProfileImage] = useState("https://picsum.photos/200/200");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    if (passwordStatus !== 'idle') setPasswordStatus('idle');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
        setPasswordStatus('error');
        return;
    }
    if (!passwords.current || !passwords.new) return;
    
    // Simulate API delay
    const btn = e.currentTarget.querySelector('button');
    if (btn) {
        const originalText = btn.innerText;
        btn.innerText = "Updating...";
        // Disable temporarily
        btn.disabled = true;

        setTimeout(() => {
            setPasswordStatus('success');
            setPasswords({ current: '', new: '', confirm: '' });
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1000);
    }
  };

  return (
     <div className="p-6 max-w-4xl mx-auto space-y-8 text-slate-900 dark:text-white animate-fade-in">
        {/* Header */}
        <div>
           <h2 className="text-2xl font-bold">Settings</h2>
           <p className="text-slate-500 dark:text-slate-400">Manage your profile and workspace preferences.</p>
        </div>

        {/* Profile Section */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-200">
           <h3 className="text-lg font-semibold mb-6">Profile Information</h3>
           <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-4">
                 <div className="relative group">
                    <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-sm" />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg ring-4 ring-white dark:ring-slate-900"
                    >
                       <Camera size={18} />
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                 </div>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
              </div>

              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                    <div className="relative">
                       <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input type="text" defaultValue="Alex Morgan" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Email</label>
                    <div className="relative">
                       <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input type="email" defaultValue="alex.morgan@nexus.com" disabled className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 cursor-not-allowed transition-colors" />
                    </div>
                 </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
                    <div className="relative">
                       <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input type="text" defaultValue="Product Management" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white" />
                    </div>
                 </div>
              </div>
           </div>
           <div className="mt-8 flex justify-end">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md shadow-blue-900/10">
                 <Save size={18} />
                 Save Changes
              </button>
           </div>
        </section>

        {/* Security Section */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-200">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Security & Password</h3>
              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full">
                  <ShieldCheck size={14} />
                  <span>2FA Enabled</span>
              </div>
           </div>
           
           <form onSubmit={handleUpdatePassword} className="max-w-2xl">
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Password</label>
                    <div className="relative">
                       <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="password" 
                         name="current"
                         value={passwords.current}
                         onChange={handlePasswordChange}
                         className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white"
                         placeholder="••••••••" 
                       />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Password</label>
                        <div className="relative">
                           <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input 
                             type="password" 
                             name="new"
                             value={passwords.new}
                             onChange={handlePasswordChange}
                             className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-colors dark:text-white"
                             placeholder="New password" 
                           />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
                        <div className="relative">
                           <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input 
                             type="password" 
                             name="confirm"
                             value={passwords.confirm}
                             onChange={handlePasswordChange}
                             className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${passwordStatus === 'error' ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'} bg-slate-50 dark:bg-slate-800 outline-none transition-colors dark:text-white`}
                             placeholder="Confirm new password" 
                           />
                        </div>
                    </div>
                 </div>
              </div>

              {/* Status Messages */}
              {passwordStatus === 'error' && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                      <AlertCircle size={16} />
                      New passwords do not match.
                  </div>
              )}
              {passwordStatus === 'success' && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400 animate-fade-in">
                      <CheckCircle size={16} />
                      Password updated successfully.
                  </div>
              )}

              <div className="mt-6">
                  <button 
                    type="submit"
                    disabled={!passwords.current || !passwords.new || !passwords.confirm}
                    className="flex items-center gap-2 bg-slate-800 dark:bg-slate-700 text-white px-5 py-2.5 rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Lock size={16} />
                     Update Password
                  </button>
              </div>
           </form>
        </section>

        {/* Appearance Section */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-200">
           <h3 className="text-lg font-semibold mb-6">Appearance</h3>
           <div className="grid grid-cols-2 gap-4 max-w-md">
              <button
                onClick={() => isDarkMode && toggleTheme()}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${!isDarkMode ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
              >
                 <Sun size={24} className={!isDarkMode ? 'text-blue-600' : 'text-slate-400'} />
                 <span className={`font-medium ${!isDarkMode ? 'text-blue-900 dark:text-blue-100' : 'text-slate-600 dark:text-slate-400'}`}>Light Mode</span>
              </button>

              <button
                onClick={() => !isDarkMode && toggleTheme()}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${isDarkMode ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
              >
                 <Moon size={24} className={isDarkMode ? 'text-blue-600' : 'text-slate-400'} />
                 <span className={`font-medium ${isDarkMode ? 'text-blue-900 dark:text-blue-100' : 'text-slate-600 dark:text-slate-400'}`}>Dark Mode</span>
              </button>
           </div>
        </section>
     </div>
  );
};

export default Settings;