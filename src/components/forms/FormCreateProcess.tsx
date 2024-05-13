'use client';
import { createProcessSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { CustomDropDown } from "../ui/dropdown/CustomDropDown";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { getProviders, getRequesters, getUsersAnt } from "@/api";
import { UserAnt } from "@/models/user_ant";
import { useRouter } from "next/navigation";
import { RequesterModel } from "@/models/requesters";
import { ProvidersModel } from "@/models/providers";
import { toast } from "react-toastify";
import { createProcess, dataCreateProcess } from '../../api/process';

const getUsers = async() => {
    const accessToken =  getAccessToken();
    const response = await getUsersAnt(accessToken??'');
    return response;
}

const provider = async() => {
    const accessToken =  getAccessToken();
    const response = await getProviders(accessToken??'');
    return response;
}

const requesters = async() => {
    const accessToken =  getAccessToken();
    const response = await getRequesters(accessToken??'');
    return response;
}
const addProcess = async(data: dataCreateProcess) => {
    const accessToken =  getAccessToken();
    const response = await createProcess(data, accessToken??'');
    return response;
}



export const FormCreateProcess = () => {

    const router = useRouter();

    const [stateListRequester, setStateListRequester] = useState<RequesterModel[]>([]);
    const [stateListUser, setStateListUser] = useState<UserAnt[]>([]);
    const [stateListProviders, setStateListProviders] = useState<ProvidersModel[]>([]);
    

    const [isOpenDropDownANTUser, setIsOpenDropDownAntUser] = useState(false);
    const [selectOptionAntUser, setselectOptionAntUser] = useState('Elegir usuario ANT');
    const [isOpenDropDownRequester, setIsOpenDropDownRequester] = useState(false);
    const [selectOptionRequester, setselectOptionRequester] = useState('Elegir solicitante');
    const [isOpenDropDownProvider, setIsOpenDropDownProvider] = useState(false);
    const [selectOptionProvider, setselectOptionProvider] = useState('Elegir proveedor');


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
                setStateListProviders(response.providers??[]);
            }
            updateAccessToken(response?.accessToken??'');
        }

        fecthProviders();
    }, []);


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
    }, []);


    useEffect(() => {
        const fecthUsers = async() => {
            const response = await getUsers();
            if (!response.status && response.code === 401) {
                toast('Error de autenticación');
                updateAccessToken('');
                router.push('/auth/login');
                return;
            }
            if (response.status) {
                setStateListUser(response.users??[]);
            }
            updateAccessToken(response?.accessToken??'');
        }

        fecthUsers();
    }, []);



    const form = useForm<z.infer<typeof createProcessSchema>>({
    resolver: zodResolver(createProcessSchema),
    defaultValues: {
        antUserId: "",
        requesterUserId: "",
        providerId: "",
        plate: "",
    }
    });

    const onSubmitFuncion = async(data: z.infer<typeof createProcessSchema>) => {
        const antUserId = stateListUser.find(user => user.username === selectOptionAntUser)?.id;
        const requesterUserId = stateListRequester.find(requester => requester.name === selectOptionRequester)?.id;
        const providerId = stateListProviders.find(provider => provider.name === selectOptionProvider)?.id;
        if (!antUserId || !requesterUserId || !providerId) {
            toast('Error al crear el proceso');
        }
        data = {...data, antUserId: antUserId! , requesterUserId: requesterUserId!, providerId: providerId!};
        console.log('onSubmitFuncion', data);
        const dataCreateProcess: dataCreateProcess = {
            antUserId: data.antUserId??'',
            requesterUserId: data.requesterUserId??'',
            providerId: data.providerId??'',
            date: data.date,
            plate: data.plate,
            observations: data.observations
        };

        console.log('dataCreateProcess', dataCreateProcess);
        // return;
        const response = await addProcess(dataCreateProcess);
        if (!response.status && response.code === 401) {
            toast('Error de autenticación');
            updateAccessToken('');
            router.push('/auth/login');
            return;
        }
        if (response.status) {
            toast('Proceso creado');
            form.reset(
                {
                    plate: '',
                    observations: ''
                }
            );
        }

        
    }

    const handleSelectOptionAntUser = (option: string) => {
        setselectOptionAntUser(option);
        setIsOpenDropDownAntUser(false);
    }

    const handleSelectOptionRequester = (option: string) => {
        setselectOptionRequester(option);
        setIsOpenDropDownRequester(false);
    }

    const handleSelectOptionProvider = (option: string) => {
        setselectOptionProvider(option);
        setIsOpenDropDownProvider(false);
    }



  return (
    <div >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitFuncion)}>
                <div className="flex flex-row p-3">
                    <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem
                                className="mx-3"
                                >
                                    <FormLabel>Fecha (opcional)</FormLabel>
                                    <FormControl>
                                        <Input 
                                        type="date"
                                        className="w-full bg-white"
                                        placeholder="Placa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="plate"
                            render={({ field }) => (
                                <FormItem
                                className="mx-3"
                                >
                                    <FormLabel>Placa</FormLabel>
                                    <FormControl>
                                        <Input 
                                        type="text"
                                        className="w-full bg-white"
                                        placeholder="Placa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="antUserId"
                            render={({ field }) => (
                                <FormItem
                                className="mx-3"
                                >
                                    <FormLabel>Usuario ANT</FormLabel>
                                    <FormControl>
                                        <CustomDropDown 
                                        options={
                                            stateListUser.map(user => user.username??'')
                                        } 
                                        handOption={handleSelectOptionAntUser} 
                                        text={selectOptionAntUser}
                                        isOpen={isOpenDropDownANTUser}
                                        setIsOpen={setIsOpenDropDownAntUser}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="requesterUserId"
                            render={({ field }) => (
                                <FormItem
                                className="mx-3"
                                >
                                    <FormLabel>Solicitante</FormLabel>
                                    <FormControl>
                                        <CustomDropDown 
                                        options={
                                            stateListRequester.map(requester => requester.name??'')
                                        } 
                                        handOption={handleSelectOptionRequester} 
                                        text={selectOptionRequester}
                                        isOpen={isOpenDropDownRequester}
                                        setIsOpen={setIsOpenDropDownRequester}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="providerId"
                            render={({ field }) => (
                                <FormItem
                                className="mx-3"
                                >
                                    <FormLabel>Proveedoredor</FormLabel>
                                    <FormControl>
                                        <CustomDropDown 
                                        options={
                                            stateListProviders.map(provider => provider.name??'')
                                        } 
                                        handOption={handleSelectOptionProvider} 
                                        text={selectOptionProvider}
                                        isOpen={isOpenDropDownProvider}
                                        setIsOpen={setIsOpenDropDownProvider}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                </div>
                <div className="flex flex-row items-end p-3">
                    <FormField
                        control={form.control}
                        name="observations"
                        render={({ field }) => (
                            <FormItem
                            className="mx-3 w-[60%]"
                            >
                                <FormLabel>Observaciones</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="text"
                                    className="w-full bg-white"
                                    placeholder="Observaciones" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        className="mt-8 ml-5 bg-green-500 hover:bg-green-700"
                        type="submit">
                        Crear
                    </Button>    
                </div>
            </form>
        </Form>
    </div>
  )
}
