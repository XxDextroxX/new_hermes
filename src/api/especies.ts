import { EspciesModel } from "@/models/especies";
import axios, { AxiosError } from "axios";


interface Response {
    status: boolean;
    message: string;
    data?: any;
    especie?: EspciesModel;
    especies?: EspciesModel[];
    code: number;
    accessToken?: string;
  }

  export async function getAllEspecies(accessToken: string, page: number, limit: number): Promise<Response> {
    console.log(`me ejecute ${page} ${limit}`)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/especies?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },}
      );
  
      const data = response.data.data;
      const token = response.data.accessToken;
      const listEspecies = data.map((e: EspciesModel) => new EspciesModel().fromJson(e));
      
      return {
        status: true,
        message: 'Espcies encontradas',
        data: response,
        especies: listEspecies,
        code: 200,
        accessToken: token,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return {
          status: false,
          message: 'Error de autorización',
          code: 401,
        };
      }
  
      return {
        status: false,
        message: `${(axiosError.response?.data as any)?.message}`,
        data: null,
        code: axiosError.response?.status ?? 500,
        accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
      };
    }
  }

  export async function createEspecies(
    accessToken: string, serialFrom: string, 
    serialTo: string, linkedDigitadorId: string ): Promise<Response> {
      const serialFromNumber = parseInt(serialFrom);
      const serialToNumber = parseInt(serialTo);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/especies/assign`,{
        serialFrom: serialFromNumber,
        serialTo: serialToNumber,
        linkedDigitadorId: linkedDigitadorId
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },}
    
      );
  
      const data = response.data.data;
      const token = response.data.accessToken;
      const especie = new EspciesModel().fromJson(data);

      return {
        status: true,
        message: 'Espcies creada correctamente',
        data: response,
        especie: especie,
        code: 200,
        accessToken: token,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return {
          status: false,
          message: 'Error de autorización',
          code: 401,
        };
      }
  
      return {
        status: false,
        message: `${(axiosError.response?.data as any)?.message}`,
        data: null,
        code: axiosError.response?.status ?? 500,
        accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
      };
    }
  }
  export async function deleteEspecies(
    accessToken: string, id: string ): Promise<Response> {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/especies/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },}
    
      );
  
      const message = response.data.data.message;
      const token = response.data.accessToken;
      return {
        status: true,
        message: message,
        data: response,
        code: 200,
        accessToken: token,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return {
          status: false,
          message: 'Error de autorización',
          code: 401,
        };
      }
  
      return {
        status: false,
        message: `${(axiosError.response?.data as any)?.message}`,
        data: null,
        code: axiosError.response?.status ?? 500,
        accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
      };
    }
  }