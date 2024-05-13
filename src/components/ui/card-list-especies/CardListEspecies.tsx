'use client';
import { DialogComponent } from '@/components';
import { EspciesModel } from '@/models/especies';
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md';

type OnSubmitFunction = (id:string) => Promise<void>;
interface CardListEspeciesProps {
    especies: EspciesModel;
    name: string;
    index: number;
    onSubmit: OnSubmitFunction;
    
}

export const CardListEspecies = ({especies: espcies, name, index, onSubmit}: CardListEspeciesProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsActive = () => {
      setIsOpen(true);
    };

    const handleDelete = async() => {
      onSubmit(espcies.id??'');
      setIsOpen(false);
    }
  return (
    <div className="container mx-auto px-6 sm:px-6 lg:px-8 border-2 border-green-500 rounded-md my-3 w-full max-w-sm">
        <ul role="list" className="divide-y divide-gray-100">
          <li key={espcies.id} className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
            <div className="mx-auto h-10 w-10 object-cover rounded-full sm:mx-0 sm:shrink-0 bg-green-600 text-center
              flex items-center justify-center
              ">
              {index}
              </div>
            </div>
            <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">Desde: {espcies.serialFrom} Hasta: {espcies.serialTo}</p>
                <p className="text-sm font-semibold leading-6 text-gray-900">Responsable: {name}</p>
                <p className="text-sm font-semibold leading-6 text-gray-900">Creado: {espcies.createdAt?.substring(0, 10)??'Ahora'}</p>
            </div>
            <MdDelete
              size={20}
              className="text-red-500 cursor-pointer mt-2"
              onClick={toggleIsActive}
            />
            {
              isOpen&& <DialogComponent title={
                '¿Desea eliminar espcie?'
              }
              description={'La espcie se eliminará de forma permanente'}
              isSucces={false}
              onClick={handleDelete}
              open={isOpen} setOpen={setIsOpen}/>
              
            }
          </li>
      </ul>
    </div>
  )
}
