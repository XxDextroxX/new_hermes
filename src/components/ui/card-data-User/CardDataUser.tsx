'use client';
import { getUserModel, saveUserModel } from "@/lib/utils";
import { UserModel } from "@/models/user_model";
import { useUserStore } from "@/providers";
import { useEffect, useState } from "react";


export const CardDataUser = () => {

    let user: UserModel = new UserModel();
    const [stateUserLog, setstateUserLog] = useState<UserModel>(user);
    useEffect(() => {
        const userLog = getUserModel();
        if (userLog) {
            saveUserModel(userLog);
            setstateUserLog(userLog);
        }
    }, []);

  return (
    <div className="flex flex-col py-8 px-8 max-w-sm mx-auto space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <div className="mx-auto h-20 w-20 p-4 object-cover rounded-full sm:mx-0 sm:shrink-0 bg-green-600 text-center
        flex items-center justify-center
        ">
        {(stateUserLog?.name?.substring(0, 2).toUpperCase())}
        </div>

        <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
                <p className="text-sm text-black font-semibold mt-1">
                    {stateUserLog?.email}
                </p>
                <p className="text-slate-500 font-medium">
                    {stateUserLog?.name}
                </p>
            </div>
        
        </div>
    </div>
  )
}
