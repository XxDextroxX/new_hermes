'use client';
import { FormRecoveryCode } from "@/components";
import Link from "next/link";

const RecoveryCode = () => {
    return ( 
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-white py-3">Recuperar código</h1>
            <div className="border-none w-[300px] rounded-xl bg-gray-700 bg-opacity-50 shadow-xl p-5">
                <FormRecoveryCode/>
                <div className="flex justify-center pt-3">
                    <Link href="/auth/login" className="text-white text-sm">Regresar al Login</Link>
                </div>
            </div>
        </div>
     );
}
 
export default RecoveryCode;