
'use client';

import { DialogComponent } from "@/components";
import { UserAnt } from "@/models/user_ant";

import {  useState } from "react";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";



type OnSubmitFunction = (id:string) => Promise<void>;

interface CardListUsersProps {
    user: UserAnt
    onSubmit: OnSubmitFunction;

}


export const CardListUsersAnt = ({user, onSubmit}: CardListUsersProps) => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleIsActive = () => {
    setIsOpen(true);
  };


  const onClick = async() => {
    onSubmit(user.id??'');
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto px-6 sm:px-6 lg:px-8 border-2 border-green-500 rounded-md my-3 w-full max-w-sm">
        <ul role="list" className="divide-y divide-gray-100">
          <li key={user.username} className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
            <div className="mx-auto h-10 w-10 object-cover rounded-full sm:mx-0 sm:shrink-0 bg-green-600 text-center
              flex items-center justify-center
              ">
              {(user?.username?.substring(0, 2).toUpperCase())}
              </div>
            </div>
            <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{user.username}</p>
                <p className="text-sm font-semibold leading-6 text-gray-900">Creado: {user.createdAt?.substring(0, 10)??'Ahora'}</p>
            </div>
            <MdDelete
              size={20}
              className="text-red-500 cursor-pointer mt-2"
              onClick={toggleIsActive}
            />
            {
              isOpen&& <DialogComponent title={
                '¿Desea eliminar usuario?'
              }
              description={'El usuario se eliminará de forma permanente'}
              isSucces={false}
              onClick={onClick}
              open={isOpen} setOpen={setIsOpen}/>
              
            }
          </li>
      </ul>
    </div>
  )
}
