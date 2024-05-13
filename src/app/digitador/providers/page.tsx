'use client';


import { createProvider, deleteProviders, getProviders } from "@/api";
import { FormCreateProviders, TableProviders } from "@/components";

import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { ProvidersModel } from "@/models/providers";
import { createProvidersSchema } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as z from 'zod';

const createProvidersOnSubmit = async (name: string, details: string) => {
    const accessToken =  getAccessToken();
    console.log(`accessToken1: ${accessToken}`);
    const response = await createProvider(name, details, accessToken??'');
    return response;
}

const provider = async() => {
    const accessToken =  getAccessToken();
    const response = await getProviders(accessToken??'');
    return response;
}

const deleteProvider = async(id: string) => {
    const accessToken =  getAccessToken();
    const response = await deleteProviders(id, accessToken??'');
    return response;
}

const ProvidersPage = () => {
    const router = useRouter();
    const [stateListRequester, setStateListRequester] = useState<ProvidersModel[]>([]);

    useEffect(() => {
        const fecthProviders = async() => {
            const response = await provider();
            if (!response.status && response.code === 401) {
                toast('Error de autenticación');
                updateAccessToken('');
                router.push('/auth/login');
                return;
            }
            if (response.status) {
                setStateListRequester(response.providers??[]);
            }
            updateAccessToken(response?.accessToken??'');
        }

        fecthProviders();
    }, [router]);


    const onSubmit = async(data: z.infer<typeof createProvidersSchema>) => {
        const response = await createProvidersOnSubmit(data.name, data.details??'');
        if (!response.status && response.code === 401) {
            toast('Error de autenticación');
            updateAccessToken('');
            router.push('/auth/login');
            return;
        }
        if (response.status) {
            setStateListRequester([...stateListRequester, response.provider!]);
            toast(`Se ha creado el solicitante ${response.provider?.name}`);
        }else{
            toast(`Error al crear el solicitante ${response.message}`);
        }
        updateAccessToken(response?.accessToken??'');
    }
    

    const onDelete = async(id: string) => {
        const response = await deleteProvider(id);
        if (!response.status && response.code === 401) {
            toast('Error de autenticación');
            updateAccessToken('');
            router.push('/auth/login');
            return;
        }
        if (response.status) {
            setStateListRequester(stateListRequester.filter(requester => requester.id !== id));
            toast('Eliminado correctamente');
        }else{
            toast(`Error al eliminar el solicitante ${response.message}`);
        }
        updateAccessToken(response?.accessToken??'');
    }



    return ( 
        <div>
            <FormCreateProviders onSubmit={onSubmit}/>
            <TableProviders  requesters={stateListRequester} onSubmit={onDelete}/>
        </div>
     );
}
 
export default ProvidersPage;