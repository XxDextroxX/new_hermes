'use client';
import { createUsersAnt, deleteUsersAnt, getUsersAnt } from "@/api";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { UserAnt } from "@/models/user_ant";
import { CreateUserAntSchema } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { toast } from "react-toastify";
import * as z from 'zod';
import 'react-toastify/dist/ReactToastify.css';
import { CardListUsersAnt, DialogComponentGeneral, FormCreateUserAnt } from "@/components";


const getUsers = async() => {
    const accessToken =  getAccessToken();
    const response = await getUsersAnt(accessToken??'');
    return response;
}

const createUser = async(username: string, owner: string) => {
    const accessToken =  getAccessToken();
    const response = await createUsersAnt(accessToken??'', username, owner);
    return response;
}

const deleteUserAnt = async(username: string) => {
    const accessToken =  getAccessToken();
    const response = await deleteUsersAnt(accessToken??'', username);
    return response;
  }
  


const UsersAnt = () => {
    const router = useRouter();
    const [stateListUser, setStateListUser] = useState<UserAnt[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fecthUsers = async() => {
            const response = await getUsers();
            if (!response.status && response.code === 401) {
                toast('Error de autenticación');
                updateAccessToken('');
                router.push('/auth/login');
            }
            if (response.status) {
                console.log('response.users', response.users)
                setStateListUser(response.users??[]);
                updateAccessToken(response?.accessToken??'');
            }else{
                setStateListUser([]);
                updateAccessToken(response?.accessToken??'');
                router.push('/auth/login');
            }
        }
        fecthUsers();
        }, []);

        const toggleIsActive = () => {
            setIsOpen(true);
          };
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    
    const filteredUsers = stateListUser.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSubmit = async(data: z.infer<typeof CreateUserAntSchema>,) => {
        console.log('DATA', data)
    const response = await createUser(data.username, data.owner??'');
    console.log('RESPONSE', response)
    if (!response.status && response.code === 401) {
        toast('Error de autenticación');
        updateAccessToken('');
        router.push('/auth/login');
    }
    if (response.status) {
        setIsOpen(false);
        toast(response.message);
        updateAccessToken(response?.accessToken??'');
        const user = response.user;
        if (user) {
            setStateListUser([...stateListUser, user]);
        }
    }else{
        toast(response.message);
        updateAccessToken(response?.accessToken??'');
    }
    }

    const onSubmitDelete = async(username: string) => {
        const response = await deleteUserAnt(username);
        if (!response.status && response.code === 401) {
            toast('Error de autenticación');
            updateAccessToken('');
            router.push('/auth/login');
        }
        if (response.status) {
            toast(response.message);
            updateAccessToken(response?.accessToken??'');
            console.log('stateListUser', stateListUser)
            setStateListUser(currentUsers => currentUsers.filter(user => user.id !== username));
        }else{
            toast(response.message);
            updateAccessToken(response?.accessToken!);
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
                <IoPersonAdd
                className="w-8 h-8 text-green-500 cursor-pointer mx-5 mt-1"
                onClick={toggleIsActive}
                />
            </div>
            {
              isOpen&& <DialogComponentGeneral
              title= 'Crear nuevo usuario'
              isSucces={true}
              showButtonDialog={true}
              open={isOpen} setOpen={setIsOpen}>
                <FormCreateUserAnt
                onSubmit={onSubmit}/>
                </DialogComponentGeneral>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
                    {
                        filteredUsers?.map((user: UserAnt) => (
                        <CardListUsersAnt key={user.username} user={user} onSubmit={onSubmitDelete}/>
                        ))
                    }
            </div>
        </div>
     );
}
 
export default UsersAnt;