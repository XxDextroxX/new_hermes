'use client';

import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

interface MessageProps{  
    message?:string,
    type?:'error'|'success'
};


export const MessageCustom = ({message, type= 'success'}: MessageProps) => {
    if (!message) return null;
  return (
    <div className={
        clsx(`bg-emerald-500/15 p-3 rounded-md items-center mb-5 
        flex gap-x-2 text-sm ${type === 'error' ? 'text-red-500' : 'text-emerald-500'}`)
    }>
        {
            type === 'success' ? <CheckCircledIcon className="h-4 w-4" /> : <ExclamationTriangleIcon className="h-4 w-4" />
        }
        <p>{message}</p>
    </div>
  )
}
