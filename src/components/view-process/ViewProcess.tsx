import { AntProcesses } from "@/models/process"


interface ViewProcessProps {
    process: AntProcesses[],
}

export const ViewProcess = ({process}: ViewProcessProps) => {
  return (
    <div className="relative overflow-x-auto mt-5 mx-3">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Placa</th>
          <th scope="col" className="px-6 py-3">Tipo de proceso</th>
          <th scope="col" className="px-6 py-3">Usuario ANT</th>
          <th scope="col" className="px-6 py-3">Fecha inicio</th>
          <th scope="col" className="px-6 py-3">Fecha fin</th>
          <th scope="col" className="px-6 py-3">Especie</th>
          <th scope="col" className="px-6 py-3">adhesivo</th>
          <th scope="col" className="px-6 py-3">Estado</th>
        </tr>
      </thead>
      <tbody>
        {process.map((process) => (
          <tr key={process.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
           
            <td className="px-6 py-4">
              {process.plate??'Desconocido'}
            </td>
            <td className="px-6 py-4">
              {process.processType??'Desconocido'}
            </td>
            <td className="px-6 py-4">
              {process.antUsername??'Desconocido'}
            </td>
            <td className="px-6 py-4">
              {process.requestDate?.substring(0, 10)}
            </td>
            <td className="px-6 py-4 hover:cursor-pointer">
              {process.finishedDate?.substring(0, 10)} 
            </td>
            <td className="px-6 py-4">
              {process.especie??'Desconocido'}
            </td>
            <td className="px-6 py-4">
              {process.adhesivo??'Desconocido'}
            </td>
            <td className="px-6 py-4">
              {process.status??'Desconocido'}
            </td>
          </tr>
          
        ))}
         
      </tbody>
    </table>
   
  </div>
  )
}
