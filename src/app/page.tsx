'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  useEffect(() => {
      //despues de 2 segundos redirigir al login

      setTimeout(() => {
        router.push('/auth/login');
      }, 2);
      
  }, [])
  return (
   <>
    <div className="h-screen flex items-center justify-center
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
        from-green-900 to-green-500
            ">
              <p
              className="text-white text-5xl"
              >Hermes</p>
    </div>
   
   </>
  );
}
