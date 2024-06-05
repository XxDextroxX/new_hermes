'use client';
import { uploadAntReport, uploadExcelReport } from "@/api/central";
import { Button, MessageCustom } from "@/components";
import { getAccessToken, updateAccessToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { FaFileExcel, FaRegFilePdf } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export const LoadPdfAnt = () => {
    const router = useRouter();
    const [pdfFile, setPdfFile] = useState<File|null>(null);
    const [message, setMessage] = useState('');
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'error' | 'success' | undefined>(undefined);
    const sendPdfAnt = async() => {
        if (!pdfFile) {
            setMessageType('error');
            setMessage('Por favor, carga un archivo');
            return;
        }
        const response = await uploadAntReport(accessToken??'',pdfFile, pdfFile.name);
        console.log(`response1: ${JSON.stringify(response)}`);
        updateAccessToken(response?.accessToken ?? '');
        if (!response.status && response.code === 401) {
            setMessageType('error');
            setMessage('Error de autenticación');
            router.push('/auth/login');
            return;
        }
        if (response.status) {
            setMessageType('success');
            setMessage((response.message as string));
            updateAccessToken(response.accessToken!);
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
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-green-500 shadow-xl  rounded-sm w-full sm:w-1/2 md:w-1/3">
          <input
            placeholder="Cargar archivo"
            type="file"
            name="pdfFile"
            id="pdfFile"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files) {
                setPdfFile(e.target.files[0]);
                // setMessageType('success');
                // setMessage('Archivo cargado');
              } else {
                setPdfFile(null);
                setMessageType('error');
                setMessage('Error al cargar el archivo');
              }
            }}
            className="w-full"
          >
          </input>
        </div>

        <div className="border-2 border-green-500 rounded-md mt-10 mb-5 p-3">
            {pdfFile?(
                <div className="flex flex-col items-center">
                    <FaRegFilePdf
                    size={25}
                    className="text-green-500 mb-1"
                    />
                    {pdfFile.name}
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
                onClick={ sendPdfAnt }
                type="submit"
                className="w-full mb-5 mx-3 bg-green-500 hover:bg-green-600"
                >
                Enviar
            </Button>
          {
            messageType === 'success' &&
              <Button
                onClick={ ()=>{
                    setPdfFile(null);
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
            pdfFile &&
              <Button
                onClick={ ()=>{
                    setPdfFile(null);
                    setMessageType(undefined);
                    setMessage('');
                } }
                type="submit"
                className="w-full mb-5 mx-3 bg-red-500 hover:bg-red-600"
                >
                Eliminar
            </Button>
          }
       </div>
       
      </div>
    )
  }
  