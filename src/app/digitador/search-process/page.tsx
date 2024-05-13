'use client';
import { getProcess } from "@/api";
import { Loader } from "@/components";
import { TableProcess } from "@/components/ui/tables/TableProcess";
import { getAccessToken, getUserModel, updateAccessToken } from "@/lib/utils";
import { ProcessModel } from "@/models/process";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const getAProcessByDate = async(page: number, 
    limit: number, 
    from: string, 
    to: string, 
    ) => {
    const accessToken =  getAccessToken();
    const userLog = getUserModel();
    const response = await getProcess(limit, page, from, to, userLog?.username??'', accessToken??'');
    return response;
}

const  SeacrhProcessPage = () => {
    const router = useRouter();
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
    const [date, setdate] = useState(currentDate);
    const [stateListProviders, setstateListProviders] = useState<ProcessModel[]>([])
    const [loader, setloader] = useState(false);

    useEffect(() => {

        const getProcessByDateInfo = async() => {
            setloader(true);
            const response = await getAProcessByDate(500, 1, date, date);
            console.log('response List', response.processes);
            if (response) {
                if (!response.status && response.code === 401) {
                    toast('Error de autenticación');
                    updateAccessToken('');
                    router.push('/auth/login');
                    return;
                }
                if (response.status) {
                    setstateListProviders(response.processes??[]);
                    updateAccessToken(response?.accessToken??'');
                }
                
            }
            setloader(false);
        }

        getProcessByDateInfo();
    
    }, [date])


    return ( 
        <div className="flex flex-col items-center ">
                
            <div className="border border-green-500 rounded-xl  bg-opacity-50 shadow-xl p-2">
                <input type="date" value={date} onChange={(e) => setdate(e.target.value)} />
            </div>
            <div className="mb-10"></div>
            {loader && 
            <div className="mt-50">
                <Loader/>
            </div>
            
            }
            {
                 !loader&& stateListProviders.length > 0 ? <TableProcess process={stateListProviders} />: 
                <div className="mt-60 text-2xl font-semibold" >
                   {
                     !loader&&<h1> No hay procesos para la fecha seleccionada</h1>
                   }
                </div>
            }
        </div>
     );
}
 
export default SeacrhProcessPage;