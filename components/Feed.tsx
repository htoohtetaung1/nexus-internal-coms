import React, { useState } from 'react';
import { Filter, MessageCircle, Heart, Share2, MoreHorizontal, ShieldAlert } from 'lucide-react';
import { Post, Department, MessageType } from '../types';

const MOCK_POSTS: Post[] = [
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
    id: '2',
    type: MessageType.UPDATE,
    author: { id: 'u2', name: 'Sarah Johnson', avatar: 'https://picsum.photos/id/2/50/50', role: 'VP Sales' },
    content: 'Huge shoutout to the EMEA team for closing the TechGlobal deal! This puts us at 110% of our Q3 quota. Amazing work everyone! 🚀',
    timestamp: '2 hours ago',
    department: Department.SALES,
    likes: 128,
    comments: 34,
    tags: ['#SalesWin', '#Q3Goals'],
  },
  {
    id: '3',
    type: MessageType.UPDATE,
    author: { id: 'u3', name: 'Mike Chen', avatar: 'https://picsum.photos/id/3/50/50', role: 'Lead Engineer' },
    content: 'The new API documentation is now live on the internal wiki. Please review the breaking changes section before the next sprint planning.',
    timestamp: '4 hours ago',
    department: Department.ENGINEERING,
    likes: 22,
    comments: 5,
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
  }
];

const Feed: React.FC = () => {
  const [filter, setFilter] = useState<Department>(Department.ALL);

  const filteredPosts = filter === Department.ALL 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.department === filter || post.department === Department.ALL);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Company Feed</h2>
          <p className="text-slate-500 dark:text-slate-400">Stay updated with the latest organizational pulses.</p>
        </div>
        
        <div className="relative">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                <Filter size={18} className="text-slate-500 dark:text-slate-400" />
                <select 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as Department)}
                    className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none"
                >
                    {Object.values(Department).map(dept => (
                        <option key={dept} value={dept} className="dark:bg-slate-800">{dept}</option>
                    ))}
                </select>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all duration-200">
            {/* Header */}
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{post.author.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{post.author.role} • {post.timestamp}</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-2">
              {post.type === MessageType.ALERT && (
                <div className="mb-3 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-3 py-1.5 rounded-md w-fit">
                    <ShieldAlert size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Urgent Alert</span>
                </div>
              )}
              {post.type === MessageType.ANNOUNCEMENT && (
                <div className="mb-3 flex items-center gap-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1.5 rounded-md w-fit">
                    <span className="text-xs font-bold uppercase tracking-wider">Official Announcement</span>
                </div>
              )}
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">{post.content}</p>
              
              {post.tags && (
                <div className="mt-3 flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-blue-600 dark:text-blue-400 text-sm hover:underline cursor-pointer">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-6 mt-2">
              <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-sm font-medium">
                <Heart size={18} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
                <MessageCircle size={18} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-sm font-medium ml-auto">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;