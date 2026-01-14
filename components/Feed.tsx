import React, { useState, useRef } from 'react';
import { Filter, MessageCircle, Heart, Share2, MoreHorizontal, ShieldAlert, Image as ImageIcon, Send, X, Crop } from 'lucide-react';
import { Post, Department, MessageType } from '../types';
import ImageCropper from './ImageCropper';

const INITIAL_POSTS: Post[] = [
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
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [filter, setFilter] = useState<Department>(Department.ALL);
  
  // Post Creation State
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPosts = filter === Department.ALL 
    ? posts 
    : posts.filter(post => post.department === filter || post.department === Department.ALL);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setTempImage(reader.result as string);
        setIsCropping(true);
      });
      reader.readAsDataURL(file);
      // Reset input so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleCropComplete = (croppedImg: string) => {
    setSelectedImage(croppedImg);
    setIsCropping(false);
    setTempImage(null);
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !selectedImage) return;

    const newPost: Post = {
        id: Date.now().toString(),
        type: MessageType.UPDATE,
        author: {
            id: 'u5',
            name: 'Alex Morgan',
            avatar: 'https://picsum.photos/40/40',
            role: 'Product Manager'
        },
        content: newPostContent,
        image: selectedImage || undefined,
        timestamp: 'Just now',
        department: Department.PRODUCT, // Defaulting to user's dept
        likes: 0,
        comments: 0
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setSelectedImage(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Image Cropper Modal */}
      {isCropping && tempImage && (
        <ImageCropper 
            imageSrc={tempImage} 
            onCropComplete={handleCropComplete} 
            onCancel={() => {
                setIsCropping(false);
                setTempImage(null);
            }} 
        />
      )}

      {/* Header & Filter */}
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

      {/* Create Post Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 mb-8 transition-colors">
        <div className="flex gap-4">
            <img src="https://picsum.photos/40/40" alt="Me" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
            <div className="flex-1">
                <textarea 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's happening in your department?" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-200 resize-none h-24 transition-colors"
                />
                
                {selectedImage && (
                    <div className="mt-3 relative w-fit group">
                        <img src={selectedImage} alt="Selected" className="h-32 rounded-lg border border-slate-200 dark:border-slate-700" />
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                        >
                            <ImageIcon size={18} />
                            <span>Photo</span>
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageSelect} 
                        />
                    </div>
                    <button 
                        onClick={handleCreatePost}
                        disabled={!newPostContent.trim() && !selectedImage}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <span>Post Update</span>
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Feed Stream */}
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
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-3">{post.content}</p>

              {post.image && (
                  <div className="mb-3 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                      <img src={post.image} alt="Post attachment" className="w-full h-auto object-cover max-h-96" />
                  </div>
              )}
              
              {post.tags && (
                <div className="flex gap-2">
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