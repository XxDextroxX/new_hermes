'use client';
import { LoginForm } from "@/components";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-white py-3">Hermes</h1>
            <div className="border-none w-[300px] rounded-xl bg-gray-700 bg-opacity-50 shadow-xl p-5">
                <LoginForm/>
                <div className="flex justify-center pt-3">
                    <Link href="/auth/recovery-password" className="text-white text-sm">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>

        </div>
      );
}
 
export default LoginPage;
