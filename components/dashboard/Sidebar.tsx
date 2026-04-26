"use client";

import {
  Heart,
  LogIn,
  LogOut,
  Music,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import NavItem from "./NavItem";
import { signIn, signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data } = useSession();

  return (
    <aside className="w-64 border-r border-white/10 flex flex-col p-6 bg-surface z-20">
      <div className="flex items-center gap-2 mb-12 group cursor-pointer">
        <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
          <Music className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">Vibify</span>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 px-2">
            Menu
          </p>

          <nav className="flex flex-col gap-1">
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

      <div className="mt-8">
        {data?.user ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-white/60 hover:text-white"
          >
            <LogOut className="w-3 h-3 inline" /> Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="text-xs text-white/60 hover:text-white"
          >
            <LogIn className="w-3 h-3 inline" /> Login
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;