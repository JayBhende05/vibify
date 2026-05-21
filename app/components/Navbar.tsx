"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
 const router = useRouter();
 
  const { data: session, status } = useSession();

  const handleLogout = ()=>{
    signOut({ callbackUrl: "/" })
  }
  return (
    <div className=" bg-[#F5F5F5] font-sans text-[#1A1A1A]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-extrabold tracking-tighter text-[#008CFF] italic">
            Vibify
          </span>
        </div>
        <div className="flex items-center gap-6">
          {status == "authenticated" ? (<>
            <p> Hello {session.user?.name} </p>
            <button
                className="text-sm font-semibold hover:opacity-70 transition-opacity cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </button></>
          ) : (
            <>
              <button
                className="text-sm font-semibold hover:opacity-70 transition-opacity cursor-pointer"
                onClick={() => router.push("/auth/login")}
              >
                Log in
              </button>

              
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
