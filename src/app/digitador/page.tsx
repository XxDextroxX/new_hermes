import { FormCreateProcess, ViewFines, ViewSri } from "@/components";

const DigitadorPage = () => {
    return ( 
        <div className="flex flex-col h-screen">
             <div className="border border-green-500 h-[220px] ">
                <FormCreateProcess/>
            </div>
            <div className="flex flex-row flex-grow">
                <ViewFines />
                <ViewSri />
            </div>
        </div>
     );
}
 
export default DigitadorPage;