'use client';
import { adminUsers } from "@/api";
import { DialogComponent, DialogComponentGeneral, FormReports } from "@/components";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { UserModel } from "@/models/user_model"
import { useUIStore } from "@/providers";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClipboard, IoClipboardOutline, IoPersonOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


interface CardListUsersProps {
    user: UserModel
}

const adminUsersFuntion = async(username: string, isActive: boolean) => {
  
  const accessToken =  getAccessToken();
  const response = await adminUsers(accessToken??'', username, isActive);
  return response;
}

export const CardListUsers = ({user}: CardListUsersProps) => {
  const isSideMenu = useUIStore((state)=>state.isSideMenuOpen);
  const router = useRouter();
  const [isActive, setisActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWindowReport, setisOpenWindowReport] = useState(false);
  useEffect(() => {
    setisActive(user.isActive??true);
  }, [user]);

  const toggleIsActive = () => {
    setIsOpen(true);
  };

  const toggleWindowReport = () => {  
    setisOpenWindowReport(!isOpenWindowReport);
  };


  const onClick = async() => {
    const response = await adminUsersFuntion(user.username??'', !isActive);
    if (!response.status && response.code === 401) {
      toast('Error de autenticación');
      updateAccessToken('');
      router.push('/auth/login');
  }
    if (response.status) {
        setisActive(!isActive);
        toast('Actualizado correctamente');

    }
    updateAccessToken(response?.accessToken??'');
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto px-6 sm:px-6 lg:px-8 border-2 border-green-500 rounded-md my-3 w-full max-w-sm">
        <ul role="list" className="divide-y divide-gray-100">
          <li key={user.email} className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
            <div className="mx-auto h-10 w-10 object-cover rounded-full sm:mx-0 sm:shrink-0 bg-green-600 text-center
              flex items-center justify-center
              ">
              {(user?.name?.substring(0, 2).toUpperCase())}
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{`Username: ${user.username}`}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{`Rol: ${user.role}`}</p>
                <div className="flex items-center justify-end gap-x-4 hover:cursor-pointer mt-2 text-sm font-semibold leading-6 text-gray-900">
                      Reporte
                      <IoClipboardOutline
                      onClick={toggleWindowReport}
                      size={20}
                      />
                </div>
              </div>
            </div>

            {
              isOpen&& <DialogComponent title={
                isActive ? 'Desactivar usuario' : 'Activar usuario'
              }
              description={isActive ? '¿Desea desactivar el usuario?' : '¿Desea activar el usuario?'}
              isSucces={!isActive}
              onClick={onClick}
              open={isOpen} setOpen={setIsOpen}/>
            }

            {
              isOpenWindowReport&&<DialogComponentGeneral
              title= 'Ver reporte'
              isSucces={true}
              showButtonDialog={true}
              open={isOpenWindowReport} setOpen={setisOpenWindowReport}>
                <FormReports username={user.username!}/>
              </DialogComponentGeneral>
            }
         <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isActive}
              onChange={() => toggleIsActive()}
            />
            {
              !isSideMenu&&
              <div className={`relative z-10 w-11 h-6 bg-gray-200 peer-focus:outline-none 
              peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
              rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
              rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white
              after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
              dark:border-gray-600 ${isActive ? 'peer-checked:bg-blue-600' : ''}`}></div>
            }
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {isActive ? 'Activo' : 'Inactivo'}
            </span>
         
          </label>
       
          </li>
      </ul>
     
    </div>
  )
}
