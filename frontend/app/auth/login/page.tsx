"use client";

import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {useAuthStore} from "@/store/useUserStore";
import { email } from "zod";

export default  function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const setUserSession = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const session = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const res = await signIn("credentials", {
      callbackUrl: "/dashboard",
      email: data.email,
      name: data.name,
    });

    if(res){
      setUserSession({id :session.data?.user.id, name : session.data?.user.name, email : session.data?.user.email})
      console.log("Auth saved user details", user);
    }
    

    console.log("Session data Got us userId ", session.data)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-surface-gradient opacity-40 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-[380px] p-8 rounded-2xl glass"
      >
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2 text-gradient">
          Welcome Back
        </h1>

        <p className="text-sm text-white/50 text-center mb-6">
          Sign in to continue your journey
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-white/30 transition"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-white/30 transition"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">Email is required</p>
            )}
          </div>
          {/* <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...register("password", { required: true })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-white/30 transition"
                          required
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div> */}

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-white to-white/80 text-black font-medium transition"
          >
            Sign in
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/40">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
        >
          Sign in with Google
        </motion.button>

        {/* Footer */}
        <p className="text-xs text-center text-white/40 mt-6">
          By continuing, you agree to our terms
        </p>
      </motion.div>
    </div>
  );
}