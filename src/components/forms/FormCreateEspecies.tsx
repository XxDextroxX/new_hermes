'use client';
import { UserModel } from "@/models/user_model"
import { CustomDropDown } from "../ui/dropdown/CustomDropDown"
import { useState } from "react";
import * as z from 'zod';
import { CreateEspciesSchema } from "@/schemas/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type OnSubmitFunction = (data: z.infer<typeof CreateEspciesSchema>, idUser: string) => Promise<void>;
interface FormCreateEspeciesProps {
    users: UserModel[],
    onSubmit: OnSubmitFunction
}

export const FormCreateEspecies = ({users, onSubmit}: FormCreateEspeciesProps) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const [selectOption, setselectOption] = useState('Elegir usuario');
    const [stateIdUser, setstateIdUser] = useState('');

    const handleSelectOption = (option: string) => {
        setselectOption(option);
        const idUser = users.find((user) => user.username === option)?.id??'';
        setstateIdUser(idUser);
        setIsOpenDropDown(false);
      }

    const form = useForm<z.infer<typeof CreateEspciesSchema>>({
        resolver: zodResolver(CreateEspciesSchema),
        defaultValues: {
          serialFrom: '',
          serialTo: '',
        }
    });

    const onSubmitFuncion = async(data: z.infer<typeof CreateEspciesSchema>, idUser: string) => {
        console.log('onSubmitFuncion', data);
        console.log('stateIdUser', stateIdUser);
        await onSubmit(data, idUser);
    }

  return (
    <div>
        <CustomDropDown 
            options={users.map((user) => user.username??'')} 
            handOption={handleSelectOption} 
            text={selectOption}
            isOpen={isOpenDropDown}
            setIsOpen={setIsOpenDropDown}
        />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(
                (data) => onSubmitFuncion(data, stateIdUser)
            )}>
                <div>
                    <FormField
                        control={form.control}
                        name="serialFrom"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Serial From</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="serialTo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Serial To</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button 
                    type="submit"
                    className="w-full mt-5 bg-green-500 hover:bg-green-400 text-white"
                    >    
                    Crear
                </Button>
            </form>
        </Form>
    </div>
  )
}
