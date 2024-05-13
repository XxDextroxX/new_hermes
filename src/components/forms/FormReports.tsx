
'use client';
import { getReportUserSchema } from "@/schemas/schemas"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "..";
import { getReportAnomalies, openUserReport } from "@/api/reports";

interface FormReportUserProps {
    username: string,
    isGeneralReport?: boolean,
}


export const FormReports = ({ username, isGeneralReport = false }: FormReportUserProps) => {
    const form = useForm<z.infer<typeof getReportUserSchema>>({
        resolver: zodResolver(getReportUserSchema),
        defaultValues: {
          from: "",
          to: "",
        }
    })

    const onSubmitFuncion = async (data: z.infer<typeof getReportUserSchema>) => {
        if (isGeneralReport) {
            getReportAnomalies(data.from, data.to);
        }
        openUserReport(data.from, data.to, username);
    }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitFuncion)}>
                <div>
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem
                                className="mb-3"
                            >
                                <FormLabel
                                    className='text-black'
                                >Fecha inicial</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        className="w-full bg-white"
                                        placeholder="Fecha inicial" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem
                                className="mb-3"
                            >
                                <FormLabel
                                    className='text-black'
                                >Fecha final</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        className="w-full bg-white"
                                        placeholder="Fecha final" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
