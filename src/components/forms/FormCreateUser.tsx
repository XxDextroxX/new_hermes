'use client';
import { CreateUserSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { MessageCustom } from "../ui/message";
import { Button, CustomDropDown } from "..";

const listRoles = ['admin', 'digitador', 'contador'];

type OnSubmitFunction = (data: z.infer<typeof CreateUserSchema>, selectOption: string) => Promise<void>;

type FormCreateUserProps = {
  onSubmit: OnSubmitFunction;
};

export const FormCreateUser = ({ onSubmit }: FormCreateUserProps) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [selectOption, setselectOption] = useState('Elegir rol');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'error' | 'success' | undefined>(undefined);
    const form = useForm<z.infer<typeof CreateUserSchema>>({
      resolver: zodResolver(CreateUserSchema),
      defaultValues: {
        email: "",
        name: "",
        userName: "",
      }
  });

  const onSubmitFuncion = async(data: z.infer<typeof CreateUserSchema>) => {
    console.log('data', data);
    console.log(selectOption);
    await onSubmit(data, selectOption);
  }
  

  const handleSelectOption = (option: string) => {
    setselectOption(option);
    setIsOpenDropDown(false);
  }


  return (
      <div className="">
        <CustomDropDown 
        options={listRoles} 
        handOption={handleSelectOption} 
        text={selectOption}
        isOpen={isOpenDropDown}
        setIsOpen={setIsOpenDropDown}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitFuncion)}>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem
                  className="mb-3"
                  >
                    <FormLabel
                    className='text-black'
                    >Nombre</FormLabel>
                    <FormControl>
                      <Input 
                      type="text"
                      className="w-full bg-white"
                      placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem
                  className="mb-3"
                  >
                    <FormLabel
                    className='text-black'
                    >Email</FormLabel>
                    <FormControl>
                      <Input 
                      type="text"
                      className="w-full bg-white"
                      placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <MessageCustom message={message} type={messageType}/>
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
