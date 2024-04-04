'use client';
import { FormRecoveryPassword } from "@/components";
import Link from "next/link";


const RecoveryPassword = () => {
    return (  
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-white py-3">Recuperar contraseña</h1>
            <div className="border-none w-[300px] rounded-xl bg-gray-700 bg-opacity-50 shadow-xl p-5">
                <FormRecoveryPassword/>
                <div className="flex justify-center pt-3">
                    <Link href="/auth/recovery-code" className="text-white text-sm">¿Ya recibiste tu código?</Link>
                </div>
            </div>
        </div>
    );
}
 
export default RecoveryPassword;