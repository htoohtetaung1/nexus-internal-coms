import React from 'react';
import { Megaphone, BellRing, FileWarning } from 'lucide-react';
import { Post, MessageType, Department } from '../types';

// Reusing same mock data structure but filtering specifically for this view
// In a real app, this would come from a context or API
const MOCK_COMMS: Post[] = [
  {
    id: '1',
    type: MessageType.ALERT,
    author: { id: 'u1', name: 'System Admin', avatar: 'https://picsum.photos/id/1/50/50', role: 'IT Support' },
    content: 'CRITICAL: Scheduled maintenance for the VPN server tonight at 02:00 AM EST. Expected downtime: 30 minutes.',
    timestamp: '1 hour ago',
    department: Department.ALL,
    likes: 45,
    comments: 12,
  },
  {
    id: '4',
    type: MessageType.ANNOUNCEMENT,
    author: { id: 'u4', name: 'Jane Doe', avatar: 'https://picsum.photos/id/4/50/50', role: 'CEO' },
    content: 'Town Hall meeting this Friday at 10 AM. We will be discussing the 2025 strategic roadmap. Attendance is mandatory.',
    timestamp: '5 hours ago',
    department: Department.EXECUTIVE,
    likes: 342,
    comments: 0,
  },
  {
    id: '5',
    type: MessageType.ANNOUNCEMENT,
    author: { id: 'u5', name: 'HR Department', avatar: 'https://picsum.photos/id/5/50/50', role: 'HR' },
    content: 'Open Enrollment for benefits begins next Monday. Please review the new packages in the employee portal.',
    timestamp: '1 day ago',
    department: Department.HR,
    likes: 89,
    comments: 14,
  }
];

const Announcements: React.FC = () => {
    const alerts = MOCK_COMMS.filter(p => p.type === MessageType.ALERT);
    const announcements = MOCK_COMMS.filter(p => p.type === MessageType.ANNOUNCEMENT);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
       <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Tiered Communications</h2>
       </div>

       {/* Time-Sensitive Alerts */}
       <section>
          <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-400">
              <BellRing className="animate-pulse" />
              <h3 className="font-bold uppercase tracking-wider text-sm">Priority Alerts</h3>
          </div>
          <div className="space-y-4">
              {alerts.map(alert => (
                  <div key={alert.id} className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm flex gap-4">
                      <div className="bg-white dark:bg-red-900/30 p-2 rounded-full h-fit text-red-500 shadow-sm">
                          <FileWarning size={24} />
                      </div>
                      <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">{alert.author.role}</p>
                          <p className="text-slate-800 dark:text-slate-200 leading-snug">{alert.content}</p>
                          <p className="text-xs text-red-400 mt-2 font-medium">{alert.timestamp}</p>
                      </div>
                  </div>
              ))}
              {alerts.length === 0 && <p className="text-slate-400 text-sm italic">No active alerts.</p>}
          </div>
       </section>

       <div className="border-t border-slate-200 dark:border-slate-800"></div>

       {/* General Announcements */}
       <section>
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
              <Megaphone />
              <h3 className="font-bold uppercase tracking-wider text-sm">Official Announcements</h3>
          </div>
           <div className="space-y-4">
              {announcements.map(ann => (
                  <div key={ann.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                          <img src={ann.author.avatar} alt={ann.author.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                              <h4 className="font-bold text-slate-900 dark:text-white">{ann.author.name}</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{ann.author.role} • {ann.timestamp}</p>
                          </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{ann.content}</p>
                      <div className="mt-4 flex items-center gap-2">
                           <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                               {ann.department}
                           </span>
                      </div>
                  </div>
              ))}
          </div>
       </section>
    </div>
  );
};

export default Announcements;