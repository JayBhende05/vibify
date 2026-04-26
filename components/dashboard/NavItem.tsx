"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

function NavItem({
  icon,
  label,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  link: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    pathname === link || pathname.startsWith(link + "/");

  return (
    <button
      onClick={() => router.push(link)}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all w-full text-left font-medium text-sm
        ${
          isActive
            ? "bg-white/10 text-white shadow-sm"
            : "text-white/60 hover:text-white hover:bg-white/5"
        }
      `}
    >
      {icon}
      <span>{label}</span>

      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="ml-auto w-1 h-1 bg-brand rounded-full shadow-[0_0_8px_var(--color-brand)]"
        />
      )}
    </button>
  );
}

export default NavItem;