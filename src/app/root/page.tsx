'use client';
import { useUserStore } from "@/providers/user";

const RootPage = () => {
    const user = useUserStore((state) => state.user);
    return ( 
        <div>
            <h1>{user?.name}</h1>
            <h1>{user?.username}</h1>
            <h1>{user?.role}</h1>
            <h1>{user?.email}</h1>
        </div>
     );
}
 
export default RootPage;