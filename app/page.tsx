
"use client"
import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";
import {
  Music,
  Play,
  Users,
  TrendingUp,
  LogIn,
  Sparkles,
  Globe,
  Heart,
} from "lucide-react";
import  FeatureCard  from "@/components/FeatureCards";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useUserSession from "@/store/useUserStore";





export default function LandingPage() {
  const router = useRouter();
  const {data: session} = useSession();
  const userId = useUserSession((state) => state.userId)

  console.log("User session data is at homme [age" , session?.user)
  console.log("USer id set at store ", userId);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-brand/30 overflow-x-hidden font-sans">
    
      <nav className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-8 md:px-16 z-50 bg-background/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center shadow-lg shadow-brand/20">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Vibify</span>
        </div>
        <button
         onClick={() => router.push("/auth/login")}
          className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/5 flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Get Started
        </button>
      </nav>

    
      <section className="relative pt-40 pb-20 px-8 flex flex-col items-center text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-[10px] font-bold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3 h-3" />
          The Future of Social Listening
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter"
        >
          Every <span className="text-gradient">Beat</span> is <br />
          Community Driven.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          Vibify is where listeners become curators. Join real-time social
          rooms, vote on live playlists, and discover sounds defined by the
          community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
             onClick={() => router.push("/auth/login")}
            className="px-10 py-4 bg-brand-gradient rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand/40 flex items-center gap-3"
          >
            Start Listening <Play className="w-5 h-5 fill-current" />
          </button>
          <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
            Explore Charts
          </button>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 relative w-full aspect-video max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-3xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200"
            alt="App Preview"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-brand/10 mix-blend-overlay"></div>
        </motion.div>
      </section>

      
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Globe className="w-6 h-6 text-indigo-400" />}
            title="Real-time Sync"
            description="Global playlist synchronization. Every vote, every skip, every beat happens instantly for everyone."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-pink-400" />}
            title="Social Rooms"
            description="Create or join listening rooms with friends. Chat, react, and shape the vibe together."
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6 text-brand-light" />}
            title="Live Charts"
            description="See what the world is feeling right now. Our charts are 100% community-driven and update in milliseconds."
          />
        </div>
      </section>

     
      <footer className="py-12 border-t border-white/5 text-center text-white/20 text-xs tracking-widest uppercase font-bold">
        &copy; 2024 Vibify Audio Systems. All Rights Reserved.
      </footer>

     
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
    </div>
  );
}



