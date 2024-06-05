'use client';
import { uploadExcelReport } from "@/api/central";
import { Button, MessageCustom } from "@/components";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { FaFileExcel } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export const LoadExcel = () => {
    const router = useRouter();
    const [excelFile, setExcelFile] = useState<File|null>(null);
    const [message, setMessage] = useState('');
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'error' | 'success' | undefined>(undefined);
    const sendExcel = async() => {
        if (!excelFile) {
            setMessageType('error');
            setMessage('Por favor, carga un archivo');
            return;
        }
        const response = await uploadExcelReport(accessToken??'',excelFile, excelFile.name);
        console.log(`response1: ${JSON.stringify(response)}`);
        updateAccessToken(response?.accessToken);
        if (!response.status && response.code === 401) {
            setMessageType('error');
            setMessage('Error de autenticación');
            router.push('/auth/login');
            return;
        }
        if (response.status) {
            setMessageType('success');
            setMessage((response.message as string));
        }else{
            setMessageType('error');
            setMessage((response.messages as string[])[0]);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
        setAccessToken(getAccessToken());
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center px-4 py-2 h-screen">
        <div className="bg-green-500 shadow-xl  rounded-sm w-full sm:w-1/2 md:w-1/3">
          <input
            placeholder="Cargar archivo"
            type="file"
            name="excelFile"
            id="excelFile"
            accept=".xlsx,.xls"
            onChange={(e) => {
              if (e.target.files) {
                setExcelFile(e.target.files[0]);
                // setMessageType('success');
                // setMessage('Archivo cargado');
              } else {
                setExcelFile(null);
                setMessageType('error');
                setMessage('Error al cargar el archivo');
              }
            }}
            className="w-full"
          >
          </input>
        </div>

        <div className="border-2 border-green-500 rounded-md mt-10 mb-5 p-3">
            {excelFile?(
                <div className="flex flex-col items-center">
                    <FaFileExcel
                    size={25}
                    className="text-green-500 mb-1"
                    />
                    {excelFile.name}
                </div>
            ):(
                <div className="mt-1">
                    Seleccione un archivo
                </div>
            )}
        </div>
        <MessageCustom message={message} type={messageType}/>

       <div className="flex">
            <Button
                onClick={ sendExcel }
                type="submit"
                className="w-full mb-5 mx-3 bg-green-500 hover:bg-green-600"
                >
                Enviar
            </Button>
          {
            messageType === 'success' &&
              <Button
                onClick={ ()=>{
                    setExcelFile(null);
                    setMessageType(undefined);
                    setMessage('');
                } }
                type="submit"
                className="w-full mb-5 mx-3 bg-green-500 hover:bg-green-600"
                >
                Aceptar
            </Button>
          }
          {
            messageType === 'error' &&
              <Button
                onClick={ ()=>{
                    setExcelFile(null);
                    setMessageType(undefined);
                    setMessage('');
                } }
                type="submit"
                className="w-full mb-5 mx-3 bg-red-500 hover:bg-red-600"
                >
                Reintentar
            </Button>
          }
       </div>
       
      </div>
    )
  }
  