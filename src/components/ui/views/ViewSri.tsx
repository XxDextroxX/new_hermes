'use client';
import React, { useRef } from 'react'

export const ViewSri = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const url = "https://www.ecuadorlegalonline.com/consultas/agencia-nacional-de-transito/valores-a-pagar-por-matricula-matriculacion-vehicular/";

  const resetIframeUrl = () => {
    if (iframeRef.current) {
      console.log(`iframeRef.current`, iframeRef.current);
      iframeRef.current.src = url;
    }
  }

  return (
    <div className="flex flex-col items-center border border-green-500 flex-grow h-full">
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
