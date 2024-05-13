'use client';

import { createRequesterSchema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


type OnSubmitFunction = (data: z.infer<typeof createRequesterSchema>) => Promise<void>;

interface FormCreateRequesterProps {
    onSubmit: OnSubmitFunction
}
export const FormCreateRequester = ({onSubmit}: FormCreateRequesterProps) => {

    const form = useForm<z.infer<typeof createRequesterSchema>>({
        resolver: zodResolver(createRequesterSchema),
        defaultValues: {
          name: '',
        }
    });

    const onSubmitFuncion = async(data: z.infer<typeof createRequesterSchema>) => {
        console.log('onSubmitFuncion', data);
        await onSubmit(data);
        //clean form
        form.reset({
            name: '',
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
