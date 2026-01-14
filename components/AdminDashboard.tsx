import React, { useState } from 'react';
import { Users, Search, Edit2, Check, X, Shield, LogOut, LayoutGrid, MoreVertical, Trash2 } from 'lucide-react';
import { User, Department } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'System Admin', email: 'admin@nexus.corp', role: 'Super Admin', department: Department.IT, status: 'Active', avatar: 'https://picsum.photos/id/1/50/50', joinDate: '2023-01-15' },
  { id: 'u2', name: 'Sarah Johnson', email: 'sarah.j@nexus.corp', role: 'VP Sales', department: Department.SALES, status: 'Active', avatar: 'https://picsum.photos/id/2/50/50', joinDate: '2023-03-22' },
  { id: 'u3', name: 'Mike Chen', email: 'm.chen@nexus.corp', role: 'Lead Engineer', department: Department.ENGINEERING, status: 'Active', avatar: 'https://picsum.photos/id/3/50/50', joinDate: '2023-02-10' },
  { id: 'u4', name: 'Jane Doe', email: 'jane.d@nexus.corp', role: 'CEO', department: Department.EXECUTIVE, status: 'Active', avatar: 'https://picsum.photos/id/4/50/50', joinDate: '2022-11-05' },
  { id: 'u5', name: 'Alex Morgan', email: 'alex.m@nexus.corp', role: 'Product Manager', department: Department.PRODUCT, status: 'Active', avatar: 'https://picsum.photos/40/40', joinDate: '2023-06-01' },
  { id: 'u6', name: 'Emily Davis', email: 'e.davis@nexus.corp', role: 'HR Specialist', department: Department.HR, status: 'Inactive', avatar: 'https://picsum.photos/id/5/50/50', joinDate: '2023-08-14' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditClick = (user: User) => {
    setEditingId(user.id);
    setEditForm(user);
  };

  const handleSave = () => {
    setUsers(users.map(u => u.id === editingId ? { ...u, ...editForm } : u));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
        setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col">
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-50">
         <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
               <Shield size={20} className="text-white" />
            </div>
            <div>
               <h1 className="font-bold text-lg leading-none">Nexus Admin</h1>
               <span className="text-xs text-slate-400">System Management Console</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
               <p className="text-sm font-medium">Administrator</p>
               <p className="text-xs text-slate-400">Super User Access</p>
            </div>
            <button 
               onClick={onLogout}
               className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
               title="Logout"
            >
               <LogOut size={20} />
            </button>
         </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
               <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="text-blue-600 dark:text-blue-400" />
                  User Directory
               </h2>
               <p className="text-slate-500 dark:text-slate-400 mt-1">Manage employee access, roles, and departmental assignments.</p>
            </div>
            
            <div className="relative w-full md:w-auto">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                  type="text" 
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
               />
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                        <th className="px-6 py-4">Employee</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                     {filteredUsers.map(user => (
                        <tr key={user.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                           <td className="px-6 py-4">
                              {editingId === user.id ? (
                                 <div className="space-y-2">
                                    <input 
                                       type="text" 
                                       value={editForm.name || ''} 
                                       onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                       className="w-full px-2 py-1 border rounded text-sm dark:bg-slate-800 dark:border-slate-700"
                                       placeholder="Name"
                                    />
                                    <input 
                                       type="text" 
                                       value={editForm.email || ''} 
                                       onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                       className="w-full px-2 py-1 border rounded text-xs text-slate-500 dark:bg-slate-800 dark:border-slate-700"
                                       placeholder="Email"
                                    />
                                 </div>
                              ) : (
                                 <div className="flex items-center gap-3">
                                    <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                                    <div>
                                       <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                                       <p className="text-xs text-slate-500">{user.email}</p>
                                    </div>
                                 </div>
                              )}
                           </td>
                           <td className="px-6 py-4 text-sm">
                              {editingId === user.id ? (
                                 <input 
                                    type="text" 
                                    value={editForm.role || ''} 
                                    onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                                    className="w-full px-2 py-1 border rounded text-sm dark:bg-slate-800 dark:border-slate-700"
                                 />
                              ) : (
                                 <span className="text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-medium">
                                    {user.role}
                                 </span>
                              )}
                           </td>
                           <td className="px-6 py-4 text-sm">
                              {editingId === user.id ? (
                                 <select 
                                    value={editForm.department as string || ''}
                                    onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                                    className="w-full px-2 py-1 border rounded text-sm dark:bg-slate-800 dark:border-slate-700"
                                 >
                                    {Object.values(Department).map(dept => (
                                       <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                 </select>
                              ) : (
                                 <span className="text-slate-600 dark:text-slate-400">{user.department}</span>
                              )}
                           </td>
                           <td className="px-6 py-4">
                              {editingId === user.id ? (
                                  <select
                                    value={editForm.status || 'Active'}
                                    onChange={(e) => setEditForm({...editForm, status: e.target.value as 'Active' | 'Inactive'})}
                                    className="px-2 py-1 border rounded text-sm dark:bg-slate-800 dark:border-slate-700"
                                  >
                                      <option value="Active">Active</option>
                                      <option value="Inactive">Inactive</option>
                                  </select>
                              ) : (
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.status === 'Active' 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                                    {user.status}
                                </span>
                              )}
                           </td>
                           <td className="px-6 py-4 text-right">
                              {editingId === user.id ? (
                                 <div className="flex items-center justify-end gap-2">
                                    <button onClick={handleSave} className="p-1.5 bg-green-100 text-green-600 hover:bg-green-200 rounded transition-colors" title="Save">
                                       <Check size={16} />
                                    </button>
                                    <button onClick={handleCancel} className="p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded transition-colors" title="Cancel">
                                       <X size={16} />
                                    </button>
                                 </div>
                              ) : (
                                 <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEditClick(user)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors" title="Edit">
                                       <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(user.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Delete">
                                       <Trash2 size={16} />
                                    </button>
                                 </div>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            {filteredUsers.length === 0 && (
                <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                    <p>No users found matching your search.</p>
                </div>
            )}
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>Showing {filteredUsers.length} of {users.length} records</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50" disabled>Next</button>
                </div>
            </div>
         </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
