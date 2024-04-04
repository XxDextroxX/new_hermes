'use client';
import { useUserStore } from "@/providers";


export const CardDataUser = () => {
    const user = useUserStore((state) => state.user);
  return (
    <div className="py-8 px-8 max-w-sm mx-auto space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
    <div className="mx-auto h-20 w-20 object-cover rounded-full sm:mx-0 sm:shrink-0 bg-green-600 text-center
    flex items-center justify-center
    ">
      {(user?.name?.substring(0, 2).toUpperCase())}
    </div>

    <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold">
                {user?.email}
            </p>
            <p className="text-slate-500 font-medium">
                {user?.name}
            </p>
        </div>
      
    </div>
</div>
  )
}
