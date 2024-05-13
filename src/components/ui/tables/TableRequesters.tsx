'use client';
import { DialogComponent } from "@/components";
import { RequesterModel } from "@/models/requesters";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

type OnSubmitFunction = (id:string) => Promise<void>;

interface TableRequestersProps {
    requesters: RequesterModel[],
    onSubmit: OnSubmitFunction;
}



export const TableRequesters = ({requesters, onSubmit}: TableRequestersProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentId, setcurrentId] = useState('');


    const toggleIsActive = (id: string) => {
      setIsOpen(true);
      setcurrentId(id);
    };

    const onClick = async( id: string) => {
        onSubmit(id);
        setIsOpen(false);
      };
    

    return (
        <div className="relative overflow-x-auto mt-5 mx-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">No.</th>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Fecha de Creación</th>
                <th scope="col" className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {requesters.map((requester, index) => (
                <tr key={requester.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{requester.name}</td>
                  <td className="px-6 py-4">
                    {requester.createdAt ? requester.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10)}
                  </td>
                  <td className="px-6 py-4">
                    <MdDelete
                    size={20}
                    className="text-red-500 cursor-pointer mt-2"
                    onClick={() => toggleIsActive(requester.id??'')}
                    />
                  </td>
                </tr>
                
              ))}
               
            </tbody>
          </table>

          {
              isOpen&& <DialogComponent title={
                '¿Desea eliminar solicitante?'
              }
              description={'El solicitante se eliminará de forma permanente'}
              isSucces={false}
              onClick={()=>onClick(currentId)}
              open={isOpen} setOpen={setIsOpen}/>
              
            }
         
        </div>
      );
}

 

