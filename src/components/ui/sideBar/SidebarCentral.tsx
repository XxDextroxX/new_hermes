'use client';

import { logout } from "@/api/auth";
import { CardDataUser } from "@/components";
import { getAccessToken } from "@/lib/utils";
import { useUIStore } from "@/providers";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFileExcel, FaUserCircle } from "react-icons/fa";
import { IoCloseOutline, IoLogOutOutline, IoPersonOutline} from "react-icons/io5"


export const SidebarCentral = () => {
const router = useRouter();
const pathName = usePathname();
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
    }else if(response.code === 401){
        setAccessToken(null);
        closeSideMenu();
        router.push('/auth/login');
    }
  }

  useEffect(() => {
        console.log('use effect');
    if (typeof window !== 'undefined') {
      setAccessToken(getAccessToken());
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
            isSideMenu ? 
            `fixed w-screen
            h-screen bg-white z-[1000] shadow-2xl transform 
            transation-all duration-300
            overflow-y-auto`
            : 'w-[300px] h-screen bg-gray-200 bg-opacity-50 rounded-r-xl mr-5 hidden md:block'
            
        }>
         {
             isSideMenu&&  <IoCloseOutline
               className="fixed right-5 top-5 cursor-pointer"
               size={40}
               onClick={()=>closeSideMenu()}
       />

        }
        <div className="flex justify-center">
            <CardDataUser/>
        </div>
            

        <Link 
            onClick={()=>closeSideMenu()}
            href="/central"
            className={
                `
                flex items-center mt-10 p-2 hover:bg-white
                rounded transition-all
                ${pathName === '/central' ? 'bg-white' : ''}
                `
            }
        >
            <FaFileExcel 
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Subir excel
            </span>
        </Link>

        <Link
            onClick={()=>closeSideMenu()}
            href="/central/profile"
            className={`flex items-center py-1 mt-5 pl-2 hover:bg-white
            rounded transition-all
            ${pathName === '/central/profile' ? 'bg-white' : ''}
            "`}
        >
            <FaUserCircle
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Perfil
            </span>

        </Link>

        <div className="w-full h-px bg-gray-200 my-5"></div>

        <div
            onClick={()=>closeSession(accessToken??'')}
            className="flex items-center  py-1 mt-5 pl-2 hover:bg-white
            rounded transition-all hover:cursor-pointer
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
