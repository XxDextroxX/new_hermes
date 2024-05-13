'use client';
import { RecoveryCodeSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, MessageCustom } from "..";
import { Input } from '../ui/input';
import { useState } from "react";
import { recoveryPassword } from "@/api/auth";

export const FormRecoveryCode = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'error' | 'success' | undefined>(undefined);
    const form = useForm<z.infer<typeof RecoveryCodeSchema>>({
        resolver: zodResolver(RecoveryCodeSchema),
        defaultValues: {
            code: "",
            password: "",
            confirmPassword: "",
        }
    });
    const onSubmit = async(data: z.infer<typeof RecoveryCodeSchema>) => {
        if (data.password !== data.confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            setMessageType('error');
            return;
        }
        const response = await recoveryPassword(data.code, data.password);
        setMessage(response.message);
        if (response.status) {
            setMessageType('success');
        }else{
            setMessageType('error');
        }
    }
  return (
    <Form   {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem
                        className="mb-3"
                        >
                            <FormLabel
                            className='text-white'
                            >Código</FormLabel>
                            <FormControl>
                                <Input 
                                type="text"
                                className="w-full bg-white"
                                autoComplete="new-code"
                                placeholder="Código" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem
                        className="mb-3"
                        >
                            <FormLabel
                            className='text-white'
                            >Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                type="password"
                                className="w-full bg-white"
                                autoComplete="new-password"
                                placeholder="Contraseña" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem
                        className="mb-3"
                        >
                            <FormLabel
                            className='text-white'
                            >Confirmar contraseña</FormLabel>
                            <FormControl>
                                <Input
                                type="password"
                                className="w-full bg-white"
                                placeholder="Confirmar contraseña" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <MessageCustom message={message} type={messageType}/>
            <Button
                type="submit"
                className="w-full mb-5"
                >
                Enviar
            </Button>


        </form>
    </Form>
      
    )
}
