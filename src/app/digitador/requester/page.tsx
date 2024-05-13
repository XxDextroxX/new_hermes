'use client';
import { createRequester, deleteRequesters, getRequesters } from "@/api";
import { FormCreateRequester, TableRequesters } from "@/components";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { RequesterModel } from "@/models/requesters";
import { createRequesterSchema } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as z from 'zod';

const createRequesterOnSubmit = async (name: string) => {
    const accessToken =  getAccessToken();
    console.log(`accessToken1: ${accessToken}`);
    const response = await createRequester(name, accessToken??'');
    return response;
}

const requesters = async() => {
    const accessToken =  getAccessToken();
    const response = await getRequesters(accessToken??'');
    return response;
}

const deleteRequester = async(id: string) => {
    const accessToken =  getAccessToken();
    const response = await deleteRequesters(id, accessToken??'');
    return response;
}

const RequesterPage = () => {
    const router = useRouter();
    const [stateListRequester, setStateListRequester] = useState<RequesterModel[]>([]);

    useEffect(() => {
        const fecthRequesters = async() => {
            const response = await requesters();
            if (!response.status && response.code === 401) {
                toast('Error de autenticación');
                updateAccessToken('');
                router.push('/auth/login');
                return;
            }
            if (response.status) {
                setStateListRequester(response.requesters??[]);
            }
            updateAccessToken(response?.accessToken??'');
        }

        fecthRequesters();
    }, [router]);


    const onSubmit = async(data: z.infer<typeof createRequesterSchema>) => {
        const response = await createRequesterOnSubmit(data.name);
        if (!response.status && response.code === 401) {
            toast('Error de autenticación');
            updateAccessToken('');
            router.push('/auth/login');
            return;
        }
        if (response.status) {
            setStateListRequester([...stateListRequester, response.requester!]);
            toast(`Se ha creado el solicitante ${response.requester?.name}`);
        }else{
            toast(`Error al crear el solicitante ${response.message}`);
        }
        updateAccessToken(response?.accessToken??'');
    }
    

    const onDelete = async(id: string) => {
        const response = await deleteRequester(id);
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
            <FormCreateRequester onSubmit={onSubmit}/>
            <TableRequesters  requesters={stateListRequester} onSubmit={onDelete}/>
        </div>
     );
}
 
export default RequesterPage;