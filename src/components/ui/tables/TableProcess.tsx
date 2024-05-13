'use client';

import { AntProcesses, ProcessModel } from "@/models/process";
import { useState } from "react";
import { DialogComponent } from "../dialog/Dialog";
import { DialogComponentGeneral, ViewProcess } from "@/components";



interface TableProcessProps {
    process: ProcessModel[],
   
}



export const TableProcess = ({process}: TableProcessProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [listAntProcess, setlistAntProcess] = useState<AntProcesses[]>([]);


    const toggleIsActive = () => {
      setIsOpen(true);
    };

    const setListAntProcess = (list: AntProcesses[]) => {
      setlistAntProcess(list);
    }

    return (
        <div className="relative overflow-x-auto mt-5 mx-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Fecha</th>
                <th scope="col" className="px-6 py-3">Placa</th>
                <th scope="col" className="px-6 py-3">Responsable</th>
                <th scope="col" className="px-6 py-3">Solicitante</th>
                <th scope="col" className="px-6 py-3">Proveedor</th>
                <th scope="col" className="px-6 py-3">Usuario ANT</th>
                <th scope="col" className="px-6 py-3">Procesos</th>
                <th scope="col" className="px-6 py-3">Obervaciones</th>
              </tr>
            </thead>
            <tbody>
              {process.map((process) => (
                <tr key={process.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{process.createdAt?.substring(0, 10)}</td>
                  <td className="px-6 py-4">{process.plate}</td>
                  <td className="px-6 py-4">
                    {process.responsibleUser?.name}
                  </td>
                  <td className="px-6 py-4">
                    {process.requesterUser===undefined?'Desconocido':process.requesterUser.name}
                  </td>
                  <td className="px-6 py-4">
                    {process.provider?.name}
                  </td>
                  <td className="px-6 py-4">
                    {process.antUser?.username}
                  </td>
                  <td className="px-6 py-4 hover:cursor-pointer"
                  onClick={() => {
                    toggleIsActive();
                    setListAntProcess(process.antProcesses??[]);
                  }}
                  >
                    
                    {process.antProcesses?.length ===0?'Sin procesos':process.antProcesses?.map(process => process.processType).join(', ')} 
                  </td>
                  <td className="px-6 py-4">
                    {process.observations??'Sin observaciones'}
                  </td>
                </tr>
                
              ))}
               
            </tbody>
          </table>

          {
              isOpen&& <DialogComponentGeneral title={
                'Información de procesos'
              }
              children={<ViewProcess process={listAntProcess}/>}
              isSucces={true}
              onClick={()=>setIsOpen(false)}
              showButtonDialog={true}
              textButtonCancel={'Aceptar'}
              open={isOpen} setOpen={setIsOpen}/>
              
              
            }
         
        </div>
      );
}

 

