'use client';
import { RecoveryPasswordSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button, Input, MessageCustom } from "..";
import { recoveryCode } from "@/api/auth";
import { useState } from "react";



export const FormRecoveryPassword = () => {

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | undefined>(undefined);
  const form = useForm<z.infer<typeof RecoveryPasswordSchema>>({
    resolver: zodResolver(RecoveryPasswordSchema),
    defaultValues: {
      email: "",
    }
});
  const onSubmit = async(data: z.infer<typeof RecoveryPasswordSchema>) => {
    const response = await recoveryCode(data.email);
    setMessage(response.message);
    if (response.status) {
      setMessageType('success');
    }else{
      setMessageType('error');
    }
  }
  return (
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem
                  className="mb-3"
                  >
                    <FormLabel
                    className='text-white'
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
                className="w-full mb-5"
                >
                Enviar
            </Button>
          </form>
      </Form>
    
  )
}
