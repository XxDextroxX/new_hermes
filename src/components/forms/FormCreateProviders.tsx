'use client';


import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createProvidersSchema } from '@/schemas/schemas';


type OnSubmitFunction = (data: z.infer<typeof createProvidersSchema>) => Promise<void>;

interface FormCreateProvidersProps {
    onSubmit: OnSubmitFunction
}
export const FormCreateProviders = ({onSubmit}: FormCreateProvidersProps) => {

    const form = useForm<z.infer<typeof createProvidersSchema>>({
        resolver: zodResolver(createProvidersSchema),
        defaultValues: {
          name: '',
          details: '',
        }
    });

    const onSubmitFuncion = async(data: z.infer<typeof createProvidersSchema>) => {
        console.log('onSubmitFuncion', data);
        await onSubmit(data);
        //clean form
        form.reset({
            name: '',
            details: '',
        });
    }

  return (
        <div >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(
                    (data) => onSubmitFuncion(data)
                )}>
                    <div className='flex flex-row justify-center items-center p-1'>
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
                        &nbsp;
                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Detalles (opcional)</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    <Button 
                        type="submit"
                        className='mt-8 ml-5 bg-green-500 hover:bg-green-700'
                        >Crear
                    </Button>
                    </div>
                    
                </form>
            </Form>
        </div>
  )
}
