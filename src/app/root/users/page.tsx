'use client';
import { createUsers, getAllUsers } from "@/api";
import { CardListUsers, DialogComponentGeneral, FormCreateUser } from "@/components";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { UserModel } from "@/models/user_model";
import { CreateUserSchema } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import * as z from 'zod';
import {  toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const getUsers = async() => {
    const accessToken =  getAccessToken();
    const response = await getAllUsers(accessToken??'');
    return response;
}

const createUser = async( name: string, username: string, email: string, role:string) => {
    const accessToken =  getAccessToken();
    const response = await createUsers(accessToken??'', name, username, email, role);
    return response;
}

const Users = () => {
    const router = useRouter();
    const [stateListUser, setStateListUser] = useState<UserModel[]>([]);
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
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const onSubmit = async(data: z.infer<typeof CreateUserSchema>, selectOption: string) => {
        if (selectOption === '') {
            toast('Por favor seleccione un rol');
            return;
        }
        const response = await createUser(data.name, data.userName, data.email, selectOption);
        if (!response.status && response.code === 401) {
            toast('Error de autenticación');
            updateAccessToken('');
            router.push('/auth/login');
        }
        if (response.status) {
            toast(response.message);
            updateAccessToken(response?.accessToken??'');
            const user = response.user;
            if (user) {
                setStateListUser([...stateListUser, user]);
            }
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
                <IoPersonAdd
                className="w-8 h-8 text-green-500 cursor-pointer mx-5 mt-1"
                onClick={toggleIsActive}
                />
            </div>
            {
              isOpen&& <DialogComponentGeneral
              children=<FormCreateUser onSubmit={onSubmit}/>
              title= 'Crear nuevo usuario'
              isSucces={true}
              showButtonDialog={true}
              open={isOpen} setOpen={setIsOpen}/>
            }
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
                    {
                        filteredUsers?.map((user: UserModel) => (
                        <CardListUsers key={user.email} user={user}/>
                        ))
                    }
            </div>
        </div>
     );
}
 
export default Users;