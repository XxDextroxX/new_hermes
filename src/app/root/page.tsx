'use client';
import { FormReports } from "@/components";
import { useUserStore } from "@/providers/user";

const RootPage = () => {
    const user = useUserStore((state) => state.user);
    return ( 
        <div className="flex flex-col items-center justify-center h-screen">
            <FormReports isGeneralReport={true} username=""/>
        </div>
     );
}
 
export default RootPage;