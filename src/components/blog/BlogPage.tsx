import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Clock, User, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import { BlogPost } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const BlogPage: React.FC = () => {
  const { blogPosts, pageParam, navigateTo } = useApp();

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    if (pageParam) {
      return blogPosts.find(b => b.slug === pageParam) || null;
    }
    return null;
  });

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {!selectedPost ? (
        /* Blog Articles Index */
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#168C91] block mb-2">
              Automotive Knowledge Center
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight">
              Maintenance Guides & Expert Insights
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Practical maintenance tips written and reviewed by our certified master diagnostic technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE3E8] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div>
                  <div className="mb-4 rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={post.imageUrl}
                      alt={post.title}
                      aspectRatio="16/9"
                      className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-3">
                    <span className="text-[#168C91] font-bold uppercase">{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#18324A] group-hover:text-[#168C91] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#18324A] text-white flex items-center justify-center font-bold text-[10px]">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <strong className="text-slate-800 block text-[11px]">{post.author}</strong>
                      <span className="text-[10px] text-slate-400 block">{post.authorRole}</span>
                    </div>
                  </div>

                  <span className="text-[#168C91] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Blog Detail View */
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168C91] hover:underline mb-6 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Knowledge Center
          </button>

          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE3E8] shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="text-[#168C91] font-bold uppercase">{selectedPost.category}</span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
                <span>·</span>
                <span>Published {selectedPost.date}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18324A] leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-3 pt-4 border-b border-slate-100 pb-4 text-xs">
                <div className="w-9 h-9 rounded-full bg-[#18324A] text-white flex items-center justify-center font-bold text-xs">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <strong className="text-slate-800 block">{selectedPost.author}</strong>
                  <span className="text-[11px] text-slate-500">{selectedPost.authorRole} · DriveCraft Autocare</span>
                </div>
              </div>
            </div>

            {/* Article Hero Image */}
            {selectedPost.imageUrl && (
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <ImageWithFallback
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  aspectRatio="16/9"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            )}

            {/* Key Takeaways Callout */}
            <div className="bg-[#E4F3F1]/50 border border-[#168C91]/30 rounded-2xl p-5">
              <strong className="text-xs uppercase font-extrabold text-[#18324A] block mb-2">
                Key Diagnostic Takeaways:
              </strong>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedPost.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedPost.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Related Service Link */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Notice any of these symptoms in your car?</span>
              <button
                onClick={() => navigateTo('book-service')}
                className="bg-[#F07838] hover:bg-[#d86629] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Book Inspection with Technician
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
