import {motion} from "framer-motion"

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`
      flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all w-full text-left font-medium text-sm
      ${active 
        ? 'bg-white/10 text-white shadow-sm' 
        : 'text-white/60 hover:text-white hover:bg-white/5'}
    `}>
      {icon}
      <span>{label}</span>
      {active && <motion.div layoutId="activeNav" className="ml-auto w-1 h-1 bg-brand rounded-full shadow-[0_0_8px_var(--color-brand)]" />}
    </button>
  );
}

export default NavItem;