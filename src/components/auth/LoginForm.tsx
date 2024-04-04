'use client';
import * as z from 'zod';
import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginShema } from '@/schemas/login';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MessageCustom } from '..';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveAccessToken } from '@/lib/utils';
import { useUserStore } from '@/providers/user';
import { login } from '@/api/auth';
// import {  useRouter } from 'next/router';






export const LoginForm = () => {
    const setUser = useUserStore((state) => state.setUser);
    const [message, setMessagestate] = useState('');
    const [messageType, setMessageType] = useState<'error' | 'success' | undefined>(undefined);
    const form = useForm<z.infer<typeof LoginShema>>({
        resolver: zodResolver(LoginShema),
        defaultValues: {
            userName: '',
            password: '',
        }
    });

    const router = useRouter();

    const redirectToRolePage =  (role: string) => {
        switch (role) {
            case 'root':
                 router.push('/root');
                break;
            case 'admin':
                 router.push('/admin');
                break;
            case 'digitador':
                 router.push('/digitador');
                break;
            case 'contador':
                 router.push('/central');
                break;
            default:
                console.log('Rol no reconocido');
        }
    }

    const onSubmit = async (data: z.infer<typeof LoginShema>) => {
        const response = await login(data.userName, data.password);
        setMessagestate(response.message);
        if (response.status) {
            const user = response.user;
            if (user) {
                setUser(user);
            }
            setMessageType('success');
            redirectToRolePage(response.user?.role ?? '');
            saveAccessToken(response.user?.accessToken ?? '');
            
        }else{
            setMessageType('error');
        }
    };
    
  return (
    <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                            <FormItem
                            className='py-5'
                            >
                                <FormLabel
                                className='text-white'
                                >Nombre de usuario</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Nombre de usuario"
                                        {...field}
                                    />
                                </FormControl>
                                    <FormMessage 
                                        className="text-red-500" 
                                    />
                            </FormItem>
                            )}
                            />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem
                                className='pb-5'
                                >
                                    <FormLabel
                                    className='text-white'
                                    >Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="current-password"
                                            className="w-full"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage 
                                        className="text-red-500" 
                                    />
                                </FormItem>
                            )} 
                        />

                    </div>
                    <MessageCustom message={message} type={messageType}/>
                    <Button
                    type="submit"
                    className="w-full mb-5"
                    >
                    Sign in
                </Button>
                </form>

            </Form>

    </div>
  )
}
