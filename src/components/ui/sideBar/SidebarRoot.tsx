'use client';

import { logout } from "@/api/auth";
import { CardDataUser } from "@/components";
import { getAccessToken, getUserModel } from "@/lib/utils";
import { useUIStore } from "@/providers";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {  FaFilePdf, FaUserCircle, FaUsers } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa6";
import { IoCloseOutline, IoDocument, IoLogOutOutline, IoPersonOutline} from "react-icons/io5"
import { MdReport } from "react-icons/md";


export const SidebarRoot = () => {
const router = useRouter();
const pathName = usePathname();
const isSideMenu = useUIStore((state)=>state.isSideMenuOpen);
const closeSideMenu = useUIStore((state)=>state.closeSideMenu);
const [accessToken, setAccessToken] = useState<string | null>(null);
const [isAdmin, setisAdmin] = useState(false);


  const closeSession = async (token: string) => {
    const response = await logout(token);
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
    if (typeof window !== 'undefined') {
      setAccessToken(getAccessToken());
      const userLog = getUserModel();
      if (userLog) {
        setisAdmin(userLog.role === 'admin');
      }
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
                className="fixed top-0 left-0 w-screen h-screen z-30
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
            href="/root"
            className={`flex items-center mx-3 py-1 mt-5 p-2 hover:bg-white
            rounded transition-all
            ${pathName === '/root' && 'bg-white'}`}
        >
            <MdReport
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Reportes
            </span>
        </Link>

        <Link 
            onClick={()=>closeSideMenu()}
            href="/root/users"
            className={
                `flex items-center mx-3 py-1 mt-5 p-2 hover:bg-white
                rounded transition-all
                ${pathName === '/root/users' && 'bg-white'}`
            }
        >
            <FaUsers
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Usuarios
            </span>
        </Link>

       {
        !isAdmin && 
            <Link 
                onClick={()=>closeSideMenu()}
                href="/root/users/ant"
                className={
                    `flex items-center mx-3 py-1 mt-5 p-2 hover:bg-white
                    rounded transition-all
                    ${pathName === '/root/users/ant' && 'bg-white'}`
                }
        >
                <FaUserSecret
                    size={30}
                />
                <span className="ml-4 text-xl font-semibold">
                    Usuarios ANT
                </span>
            </Link>
       }

        <Link 
            onClick={()=>closeSideMenu()}
            href="/root/especies"
            className={
                `flex items-center mx-3 py-1 mt-5 p-2 hover:bg-white
                rounded transition-all
                ${pathName === '/root/especies' && 'bg-white'}`
            }
        >
            <IoDocument
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Especies
            </span>
        </Link>

        <Link
            onClick={()=>closeSideMenu()}
            href="/root/profile"
            className={`flex items-center mx-3 py-1 mt-5 pl-2 hover:bg-white
            rounded transition-all
            ${pathName === '/root/profile' && 'bg-white'}
            `}
        >
            <FaUserCircle
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Perfil
            </span>

        </Link>

        <Link
            onClick={()=>closeSideMenu()}
            href="/root/loadpdf"
            className={`flex items-center mx-3 py-1 mt-5 pl-2 hover:bg-white
            rounded transition-all
            ${pathName === '/root/loadpdf' && 'bg-white'}
            `}
        >
            <FaFilePdf
                size={30}
            />
            <span className="ml-4 text-xl font-semibold">
                Cargar PDF
            </span>

        </Link>

            <div
                onClick={()=>closeSession(accessToken??'')}
                className={
                    `flex items-center mx-3 py-1 mt-5 p-2 hover:bg-white
                    rounded transition-all hover: cursor-pointer
                    ${pathName === '/auth/login' && 'bg-white'}`
                }
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
