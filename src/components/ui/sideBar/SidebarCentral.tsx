'use client';

import { logout } from "@/api/auth";
import { CardDataUser } from "@/components";
import { getAccessToken } from "@/lib/utils";
import { useUIStore } from "@/providers";
import clsx from "clsx";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { IoCloseOutline, IoLogOutOutline, IoPersonOutline} from "react-icons/io5"


export const SidebarCentral = () => {
const router = useRouter();
const isSideMenu = useUIStore((state)=>state.isSideMenuOpen);
const closeSideMenu = useUIStore((state)=>state.closeSideMenu);

const [accessToken, setAccessToken] = useState<string | null>(null);


  const closeSession = async (token: string) => {
    console.log('closeSession:', token);
    const response = await logout(token);
    console.log('response', response);
    if (response.status) {
        setAccessToken(null);
        closeSideMenu();
        router.push('/auth/login');
    }
  }

  useEffect(() => {
        console.log('use effect');
    if (typeof window !== 'undefined') {
      console.log('use effect', 'dentro de use effect');
      setAccessToken(getAccessToken());
      console.log('accessToken:use', accessToken);
    }
  }, []);

  return (
    <div>
        {
            isSideMenu && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10
                bg-black opacity-30
                ">
                </div>
            )
        }

        {
            isSideMenu && (
                <div 
                onClick={()=>closeSideMenu()}
                className="fixed top-0 left-0 w-screen h-screen z-20
                backdrop-filter backdrop-blur-sm
                ">
                </div>
            )
        }

        <nav className={
            clsx(
                `fixed p-5 right-0 top-0 w-[500px]
                h-screen bg-white z-20 shadow-2xl transform 
                transation-all duration-300
                overflow-y-auto
                `,
                {
                    "translate-x-full": !isSideMenu
                }
        
            )
        }>
        <IoCloseOutline
                className="fixed right-5 top-5 cursor-pointer"
                size={40}
                onClick={()=>closeSideMenu()}
        />

        <div className="mt-5">
            <CardDataUser/>
        </div>
            
        <Link
            href="/"
            className="flex items-center mt-10 p-2 hover:bg-gray-100
            rounded transition-all
            "
        >
            <IoPersonOutline
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Perfil
            </span>

        </Link>

        <Link 
            href="/"
            className="flex items-center mt-10 p-2 hover:bg-gray-100
            rounded transition-all
            "
        >
            <FaFileExcel 
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Subir excel
            </span>
        </Link>

        <div className="w-full h-px bg-gray-200 my-10"></div>

        <div
            onClick={()=>closeSession(accessToken??'')}
            className="flex items-center mt-10 p-2 hover:bg-gray-100
            rounded transition-all
            "
        >
            <IoLogOutOutline
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Salir
            </span>
        </div>
        </nav>
    </div>
  )
}
