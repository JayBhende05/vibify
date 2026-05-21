"use client";

import {
  LogIn,
  LogOut,
  Menu,
  Music,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { signIn, signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0F1117]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
            <Music className="w-5 h-5 text-white" />
          </div>

          <span className="text-lg font-bold tracking-tight text-white">
            Vibify
          </span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

     
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0
          h-screen w-72
          bg-[#0F1117]/95 backdrop-blur-xl
          border-r border-white/10
          flex flex-col
          p-6 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
    
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
              <Music className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">Vibify</h1>
              <p className="text-xs text-white/40">Feel the music</p>
            </div>
          </div>

          
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white/70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

       
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-4 px-2">
              Menu
            </p>

            <nav className="flex flex-col gap-2">
              <NavItem
                icon={<TrendingUp className="w-4 h-4" />}
                label="Home"
                link="/dashboard"
              />

              <NavItem
                icon={<Users className="w-4 h-4" />}
                label="Create Rooms"
                link="/dashboard/room/create"
              />

              <NavItem
                icon={<Users className="w-4 h-4" />}
                label="Join Rooms"
                link="/dashboard/room/join"
              />
            </nav>
          </div>
        </div>

        
        <div className="pt-6 border-t border-white/10 mt-auto">
          {data?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="
                w-full flex items-center justify-center gap-2
                py-3 rounded-xl
                bg-red-500/10 hover:bg-red-500/20
                border border-red-500/20
                text-red-400 hover:text-red-300
                transition-all duration-200
                font-medium text-sm
              "
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="
                w-full flex items-center justify-center gap-2
                py-3 rounded-xl
                bg-brand-gradient
                hover:opacity-90
                text-white
                transition-all duration-200
                font-medium text-sm
                shadow-lg shadow-brand/20
              "
            >
              <LogIn className="w-4 h-4" />
              Login with Google
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;