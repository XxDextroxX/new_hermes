'use client';
import { UpdateUserSchema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { UserModel } from '@/models/user_model';
import { useEffect, useState } from 'react';
import { getAccessToken, getUserModel, saveUserModel, updateAccessToken } from '@/lib/utils';
import { MessageCustom } from '../ui/message';
import { toast } from 'react-toastify';
import { updateUser } from '@/api';
import { useForm } from 'react-hook-form';

export const FormUpdateUser = () => {

    let user: UserModel = new UserModel();
    const [stateUserLog, setstateUserLog] = useState<UserModel>(user);
    useEffect(() => {
        const userLog = getUserModel();
        if (userLog) {
            saveUserModel(userLog);
            setstateUserLog(userLog);
            console.log('stateUserLog', stateUserLog.toJson());
        }
    }, []);

    const form = useForm<z.infer<typeof UpdateUserSchema>>({
        mode: 'onChange',
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
          email: stateUserLog.email,
          name: stateUserLog.name,
          username: stateUserLog.username,
          password: undefined,
          oldPassword: undefined,
        }
        
    });

    const handlerSubmit = async (data: z.infer<typeof UpdateUserSchema>) => {
        try {
            const  json = {
                name: data.name??stateUserLog.name,
                username: data.username??stateUserLog.username,
                email: data.email??stateUserLog.email,
            }
            const accessToken =  getAccessToken();
            console.log('accessToken', accessToken);
            const userModel = new UserModel(json);
            console.log(`userModel`, userModel.toJson());
            console.log(`password`, data.password);
            console.log(`oldPassword`, data.oldPassword);
            // return;
            const response = await updateUser(userModel, accessToken??'', data.password, data.oldPassword);
            console.log(`response`, response);
            if (response.status) {
                toast('Usuario actualizado');
                
            }else{
                toast(response.message??'Error al actualizar usuario');
            }
            updateAccessToken(response.accessToken!);
        } catch (error) {
            toast('Error al actualizar usuario');
        }
    }


  return (
    <div className='flex flex-col items-center justify-center'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handlerSubmit)}>
                <div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuario</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    &nbsp;
                    <MessageCustom message={'Solo llenar si cambia la contraseña'} type='error'/>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña Actual</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña nueva</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            <Button
                type="submit"
                className="w-full mt-5 bg-green-500 hover:bg-green-400 text-white"
                >
                Aceptar
            </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}
