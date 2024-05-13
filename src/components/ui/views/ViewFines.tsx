'use client';
import { useRef } from "react";


export const ViewFines = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const url = "https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_criterio_consulta.jsp";
  const resetIframeUrl = () => {
    console.log("resetIframeUrl");
    console.log(`iframeRef.current`, iframeRef.current);
    if (iframeRef.current) {
      console.log("iframeRef.current");
      iframeRef.current.src = url;
    }
  }
  return (
    <div className="flex items-center flex-col border border-green-500 runde flex-grow h-full">
      <button 
        onClick={resetIframeUrl} 
        className="p-2 bg-green-500 text-white rounded-b-sm w-[200px] ">
          Restablecer
        </button>
      <iframe 
        ref={iframeRef}
        className="w-full h-full"
        src={url}
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen>
        </iframe>
        
    </div>
  )
}
