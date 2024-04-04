'use client';
import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/providers/ui-store";




export const ButtonOpenMenu = () => {
    const openSideMenu = useUIStore((state)=>state.openSideMenu);
  return (
    <button 
    onClick={openSideMenu}
    className={`${titleFont.className} m-2 p-2 rounded-md
    transition-all hover:bg-slate-200
    `}>Menu</button>
  )
}
