"use client";

import MagneticCard from "@/components/Community/MagneticCard";
import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react";

export default function CommunityPage() {
  const posts = [
    {
      id: 1,
      author: 'SYS_ADMIN',
      badge: 'v2.0_Update',
      time: '12m ago',
      content: 'The new Anti-Gravity navigation physics have been successfully deployed to all active relays. Expect sub-20ms latency on client-side renders. Monitor system telemetry for any anomalous behavior.',
      likes: 124,
      comments: 32,
    },
    {
      id: 2,
      author: 'ECHO_USER',
      badge: 'Hardware',
      time: '1h ago',
      content: 'Just received the new mechanical switches. The tactile response is exactly 45g actuation. I\'ve uploaded the full spec sheet and frequency response graphs to the shared terminal.',
      likes: 89,
      comments: 14,
    },
    {
      id: 3,
      author: 'NEXUS_DEV',
      badge: 'Design_Spec',
      time: '3h ago',
      content: 'Are we strictly adhering to the 1px rgba(255,255,255,0.05) border limits for the upcoming floating dock implementation? I\'ve drafted some motion curves that might conflict with the z-index stacking.',
      likes: 210,
      comments: 45,
    }
  ];

  return (
    <div className="space-y-8 pb-32 md:pb-0">
      
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bebas text-4xl md:text-5xl tracking-[4px] text-white flex items-center gap-4">
            GLOBAL_FEED <span className="w-3 h-3 bg-[#D9FF00] rounded-full animate-pulse shadow-[0_0_15px_rgba(217,255,0,0.8)]" />
          </h1>
          <p className="font-jetbrains-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
            Displaying live telemetry...
          </p>
        </div>
        
        {/* Filter / Sort Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-xl hover:bg-white/[0.08] hover:border-[#D9FF00]/30 transition-all text-xs font-jetbrains-mono uppercase text-white/60 hover:text-white">
          <span>Sort By:</span>
          <span className="text-[#D9FF00]">Latest</span>
        </button>
      </div>

      {/* Post Input Card */}
      <MagneticCard delay={0.2}>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-[32px] p-6 backdrop-blur-3xl">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden shrink-0 bg-[#050505]">
              <img src="https://ui-avatars.com/api/?name=User&background=D9FF00&color=050505" alt="Current User" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="BROADCAST_MESSAGE..." 
                className="w-full bg-transparent border-none outline-none resize-none font-sans text-sm text-white placeholder:text-white/20 mt-2 h-12"
              />
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] mt-2">
                <div className="flex gap-2 text-white/40">
                  <button className="text-[10px] font-jetbrains-mono uppercase hover:text-[#D9FF00] transition-colors">Attach_Data</button>
                </div>
                <button className="px-6 py-2 bg-white/[0.05] hover:bg-[#D9FF00] text-white/60 hover:text-black hover:shadow-[0_0_20px_rgba(217,255,0,0.3)] transition-all rounded-xl text-xs font-jetbrains-mono uppercase border border-white/10 hover:border-transparent">
                  Transmit
                </button>
              </div>
            </div>
          </div>
        </div>
      </MagneticCard>

      {/* Feed Stream */}
      <div className="space-y-6">
        {posts.map((post, i) => (
          <MagneticCard key={post.id} delay={0.3 + (i * 0.1)}>
            <div className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.1] rounded-[32px] p-6 md:p-8 backdrop-blur-3xl transition-colors duration-500">
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-[#111]">
                      <img src={`https://ui-avatars.com/api/?name=${post.author.charAt(0)}`} alt={post.author} className="w-full h-full object-cover opacity-70" />
                    </div>
                    {i === 0 && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#D9FF00] rounded-full border-[2px] border-[#050505]" />}
                  </div>
                  <div>
                    <h3 className="font-bebas text-lg tracking-[2px] text-white leading-none flex items-center gap-3">
                      {post.author}
                      <span className="font-jetbrains-mono text-[9px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50 tracking-widest uppercase">
                        {post.badge}
                      </span>
                    </h3>
                    <p className="font-jetbrains-mono text-[9px] text-white/30 uppercase mt-1">{post.time}</p>
                  </div>
                </div>
                
                <button className="p-2 text-white/20 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed tracking-wide">
                {post.content}
              </p>

              <div className="flex items-center gap-6 mt-8 pt-4 border-t border-white/[0.02]">
                <button className="flex items-center gap-2 group/btn">
                  <div className="p-2 rounded-full bg-white/[0.02] group-hover/btn:bg-white/[0.1] transition-colors border border-transparent group-hover/btn:border-white/[0.05]">
                    <Heart size={16} className="text-white/40 group-hover/btn:text-[#D9FF00] transition-colors" />
                  </div>
                  <span className="font-jetbrains-mono text-[10px] text-white/40 group-hover/btn:text-[#D9FF00] transition-colors">{post.likes}</span>
                </button>
                
                <button className="flex items-center gap-2 group/btn">
                  <div className="p-2 rounded-full bg-white/[0.02] group-hover/btn:bg-white/[0.1] transition-colors border border-transparent group-hover/btn:border-white/[0.05]">
                    <MessageSquare size={16} className="text-white/40 group-hover/btn:text-white transition-colors" />
                  </div>
                  <span className="font-jetbrains-mono text-[10px] text-white/40 group-hover/btn:text-white transition-colors">{post.comments}</span>
                </button>

                <button className="flex items-center gap-2 group/btn ml-auto">
                  <div className="p-2 rounded-full bg-white/[0.02] group-hover/btn:bg-white/[0.1] transition-colors border border-transparent group-hover/btn:border-white/[0.05]">
                    <Share2 size={16} className="text-white/40 group-hover/btn:text-white transition-colors" />
                  </div>
                </button>
              </div>

            </div>
          </MagneticCard>
        ))}
      </div>
      
    </div>
  );
}
