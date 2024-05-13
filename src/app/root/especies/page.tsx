'use client';
import { getAllUsersDigitadores } from "@/api";
import { createEspecies, deleteEspecies, getAllEspecies } from "@/api/especies";
import { CardListEspecies, DialogComponentGeneral, FormCreateEspecies } from "@/components";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { EspciesModel } from "@/models/especies";
import { UserModel } from "@/models/user_model";
import { CreateEspciesSchema } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { toast } from "react-toastify";
import * as z from 'zod';

const getUsersDigitadores = async() => {
    const accessToken =  getAccessToken();
    const response = await getAllUsersDigitadores(accessToken??'');
    return response;
}
const getEspecies = async( page: number, limit: number) => {
    const accessToken =  getAccessToken();
    const response = await getAllEspecies(accessToken??'', page, limit);
    return response;
}

const createEspeciesI = async( serialFrom: string, 
    serialTo: string, linkedDigitadorId: string) => {
    const accessToken =  getAccessToken();
    const response = await createEspecies(accessToken??'', 
                    serialFrom, serialTo, linkedDigitadorId);
    return response;
}

const deleteEspeciesI = async(id: string) => {
    const accessToken =  getAccessToken();
    const response = await deleteEspecies(accessToken??'', id);
    return response;
}

const Especies = () => {
    const router = useRouter();
    const [stateListUser, setStateListUser] = useState<UserModel[]>([]);
    const [ListEspcies, setListEspcies] = useState<EspciesModel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [statePageQuery, setstatePageQuery] = useState(1);
    const listEndRef = useRef<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fechthUsers = async() => {
            const responseUsersDigitadores = await getUsersDigitadores();
            if (!responseUsersDigitadores.status && responseUsersDigitadores.code === 401) {
                toast('Error de autenticación');
                updateAccessToken('');
                router.push('/auth/login');
            }
            if (responseUsersDigitadores.status) {
                setStateListUser(responseUsersDigitadores?.users??[]);
                updateAccessToken(responseUsersDigitadores?.accessToken??'');
            }else{
                setStateListUser([]);
                updateAccessToken(responseUsersDigitadores?.accessToken??'');
                router.push('/auth/login');
            }
        }

        fechthUsers();
    }, [])


    useEffect(() => {
   
        const fecthEspecies = async() => {
            if (!hasMore) {
                console.log('No hay mas datos9999');
                return;
            }
            console.log('statePageQuery***', statePageQuery);
            const responseEspecies = await getEspecies(statePageQuery, 20);
            if (!responseEspecies.status && responseEspecies.code === 401) {
                toast('Error de autenticación');
                updateAccessToken('');
                router.push('/auth/login');
            }
            if (responseEspecies.status) {
                console.log('listEspecies', responseEspecies!.especies??[]);
                setListEspcies([...ListEspcies, ...responseEspecies!.especies!]);
                updateAccessToken(responseEspecies?.accessToken??'');
            }
            console.log('responseEspecies.length', responseEspecies?.especies?.length??0);
            if (responseEspecies?.especies!.length < 20) {
                console.log('No hay mas datos');
                setHasMore(false);
            } else {
                console.log('Hay mas datos');
                setHasMore(true);
            }
        }

        fecthEspecies();
    }, [statePageQuery, setHasMore]);


    useEffect(() => {
        if (!hasMore) {
            console.log('No hay mas datos %%%%%%%%%%%%%');
            return;
        }
        if (observer.current) observer.current.disconnect();
    
            observer.current = new IntersectionObserver(entries => {
                console.log('ListEspcies$$$$$$$$$$', ListEspcies.length);
                if (entries[0].isIntersecting&&ListEspcies.length > 0) {
                    console.log('entro a la intersección');
                    setstatePageQuery(statePageQuery + 1);
            }
        });
        if (listEndRef.current) {
            observer.current.observe(listEndRef.current);
        }
        // Devuelve una función de limpieza que se ejecutará cuando el componente se desmonte
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [ListEspcies]);
    
    

    const toggleIsActive = () => {
        setIsOpen(true);
      };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredEspecies = ListEspcies.filter(especies =>
        especies.serialFrom?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSubmit = async(data: z.infer<typeof CreateEspciesSchema>, idUser: string) => {
        const response = await createEspeciesI(data.serialFrom, data.serialTo, idUser);
        if (!response.status && response.code === 401) {
            toast('Error de autenticación');
            updateAccessToken('');
            router.push('/auth/login');
        }
        if (response.status) {
            toast(response.message);
            updateAccessToken(response?.accessToken??'');
            const especie = response.especie;
            if (especie) {
                setListEspcies([...ListEspcies, especie]);
            }
            setIsOpen(false);
        }else{
            toast(response.message);
            updateAccessToken(response?.accessToken??'');
        }
      }

      const onSubmitDelete = async(id: string) => {
        const response = await deleteEspeciesI(id);
        if (!response.status && response.code === 401) {
            toast('Error de autenticación');
            updateAccessToken('');
            router.push('/auth/login');
        }
        if (response.status) {
            toast(response.message);
            updateAccessToken(response?.accessToken??'');
            console.log('stateListUser', stateListUser)
            setListEspcies(currentEspcies => currentEspcies.filter(especies => especies.id !== id));
            setIsOpen(false);
        }else{
            toast(response.message);
            updateAccessToken(response?.accessToken??'');
        }
    }

    return ( 
        <div>
            <div className="flex justify-center">
                <input 
                onChange={(e) => handleSearchChange(e)}
                type="text" placeholder="Buscar" className="w-1/2 p-2 
                rounded-md border border-gray-300 focus:outline-none 
                focus:ring-2 focus:ring-green-500" />
                <MdOutlinePlaylistAdd
                className="w-8 h-8 text-green-500 cursor-pointer mx-5 mt-1"
                onClick={toggleIsActive}
                />
            </div>
            {
              isOpen&& <DialogComponentGeneral
              children=<FormCreateEspecies 
              users={stateListUser}
              onSubmit={onSubmit}
              />
              title= 'Crear nueva especie'
              isSucces={true}
              showButtonDialog={true}
              open={isOpen}
              setOpen={setIsOpen}/>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
                    {
                        filteredEspecies?.map((e: EspciesModel, i: number) => (
                        <CardListEspecies key={e.id} 
                        onSubmit={onSubmitDelete}
                        especies={e} 
                        name={
                            stateListUser.find(user => user.id === e.linkedDigitadorId)?.name??'Desconocido'
                        } 
                        index={(i+1)}/>
                        ))
                    }
                <div ref={listEndRef}></div>
            </div>
        </div>
     );
}
 
export default Especies;