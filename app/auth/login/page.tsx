"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
// import { Chrome } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
      
      {/* Subtle gradient glow background */}
      <div className="absolute inset-0 bg-surface-gradient opacity-40 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-[360px] p-8 rounded-2xl glass"
      >
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2 text-gradient">
          Welcome Back
        </h1>

        <p className="text-sm text-white/50 text-center mb-8">
          Sign in to continue your journey
        </p>

        {/* Login Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-medium transition-all duration-200 hover:bg-white/90"
        >
          {/* <Chrome className="w-5 h-5" /> */}
          Sign in with Google
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/40">secure login</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-white/40">
          By continuing, you agree to our terms
        </p>
      </motion.div>
    </div>
  );
}