import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, RefreshCw, Calendar, Radio } from 'lucide-react';
import { NewsArticle } from '../types';
import { fetchIndustryNews } from '../services/geminiService';

const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Energy', 'Automotive', 'AI'];

const NewsDashboard: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('Technology');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadNews = async () => {
    setLoading(true);
    // Add a small artificial delay if needed for UX, but fetching usually takes time
    const news = await fetchIndustryNews(selectedIndustry);
    setArticles(news);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndustry]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Newspaper className="text-purple-600" />
            External Intelligence
          </h2>
          <div className="flex items-center gap-2 mt-1">
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
             </span>
             <p className="text-slate-500 dark:text-slate-400 text-sm">Live Global Market Feed</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                {INDUSTRIES.map(ind => (
                    <button
                        key={ind}
                        onClick={() => setSelectedIndustry(ind)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            selectedIndustry === ind 
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        {ind}
                    </button>
                ))}
            </div>
            <button 
                onClick={loadNews}
                disabled={loading}
                className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors shadow-sm"
                title="Refresh Feed"
            >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
        </div>
      </div>

      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse flex flex-col p-6">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                    <div className="mt-auto h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                </div>
            ))}
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
                <article key={idx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900 transition-all duration-300 flex flex-col h-full group">
                    <div className="h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:h-2 transition-all"></div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md uppercase tracking-wider">
                                {article.source}
                            </span>
                            {article.date && (
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Calendar size={12} />
                                    {article.date}
                                </span>
                            )}
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-3 line-clamp-3 leading-tight group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-4 leading-relaxed">
                            {article.summary}
                        </p>
                        <a 
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-auto flex items-center gap-2 text-sm font-medium hover:underline ${article.url === '#' ? 'text-slate-400 cursor-not-allowed' : 'text-purple-600 dark:text-purple-400'}`}
                            onClick={(e) => article.url === '#' && e.preventDefault()}
                        >
                            {article.url === '#' ? 'Source Unavailable' : 'Read Full Story'} 
                            {article.url !== '#' && <ExternalLink size={14} />}
                        </a>
                    </div>
                </article>
            ))}
            
            {articles.length === 0 && !loading && (
                <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <Radio className="mx-auto mb-2 text-slate-400" size={32} />
                    <p>No recent news found for this category.</p>
                </div>
            )}
        </div>
      )}

      {lastUpdated && !loading && (
          <div className="mt-8 flex justify-center">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  Last updated: {lastUpdated.toLocaleTimeString()} via Nexus AI • Google Search Grounding
              </span>
          </div>
      )}
    </div>
  );
};

export default NewsDashboard;