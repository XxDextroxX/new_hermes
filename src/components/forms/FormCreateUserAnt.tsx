'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { MessageCustom } from "../ui/message";
import { Button } from "..";
import { CreateUserAntSchema } from "@/schemas/schemas";



type OnSubmitFunction = (data: z.infer<typeof CreateUserAntSchema>) => Promise<void>;

type FormCreateUserProps = {
  onSubmit: OnSubmitFunction;
};

export const FormCreateUserAnt = ({ onSubmit }: FormCreateUserProps) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | undefined>(undefined);

  const form = useForm<z.infer<typeof CreateUserAntSchema>>({
    resolver: zodResolver(CreateUserAntSchema),
    defaultValues: {
      username: "",
      owner: ""
    }
  });

  const onSubmitFuncion = async (data: z.infer<typeof CreateUserAntSchema>) => {
    console.log('onSubmitFuncion', data);
    await onSubmit(data);
  }



  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitFuncion)}>
          <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem
                  className="mb-3"
                >
                  <FormLabel
                    className='text-black'
                  >Usuario</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full bg-white"
                      placeholder="Usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <MessageCustom message={message} type={messageType} />
          <Button
            type="submit"
            className="w-full mb-5 bg-green-500 hover:bg-green-400 text-white"
          >
            Aceptar
          </Button>
        </form>
      </Form>
    </div>
  )
}
