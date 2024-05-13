'use client';

import { logout } from "@/api/auth";
import { CardDataUser } from "@/components";
import { getAccessToken } from "@/lib/utils";
import { useUIStore } from "@/providers";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFileExcel, FaUserCircle, FaUserShield, FaUserTie } from "react-icons/fa";
import { IoCloseOutline, IoLogOutOutline, IoPersonOutline, IoSearch} from "react-icons/io5"
import { MdCreate, MdCreateNewFolder } from "react-icons/md";


export const SidebarDigitador = () => {
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
            href="/digitador"
            className={
                `
                flex items-center mx-3 py-1 mt-5 pl-2 hover:bg-white
                rounded transition-all
                ${pathName === '/digitador' ? 'bg-white' : ''}
                `
            }
        >
            <MdCreateNewFolder 
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Crear proceso
            </span>
        </Link>

        <Link 
            onClick={()=>closeSideMenu()}
            href="/digitador/search-process"
            className={
                `
                flex items-center mx-3 py-1 mt-5 pl-2 hover:bg-white
                rounded transition-all
                ${pathName === '/digitador/search-process' ? 'bg-white' : ''}
                `
            }
        >
            <IoSearch 
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Consultar proceso
            </span>
        </Link>
        <Link 
            onClick={()=>closeSideMenu()}
            href="/digitador/requester"
            className={
                `
                flex items-center mx-3 py-1 mt-5 pl-2 hover:bg-white
                rounded transition-all
                ${pathName === '/digitador/requester' ? 'bg-white' : ''}
                `
            }
        >
            <FaUserTie 
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Solicitantes
            </span>
        </Link>
        <Link 
            onClick={()=>closeSideMenu()}
            href="/digitador/providers"
            className={
                `
                flex items-center mx-3 py-1 mt-5 pl-2 hover:bg-white
                rounded transition-all
                ${pathName === '/digitador/providers' ? 'bg-white' : ''}
                `
            }
        >
            <FaUserShield 
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Proveedores
            </span>
        </Link>

        <Link
            onClick={()=>closeSideMenu()}
            href="/digitador/profile"
            className={`flex items-center mx-3 py-1 mt-5 pl-2 hover:bg-white
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
            className="flex items-center mx-3  py-1 mt-5 pl-2 hover:bg-white
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
