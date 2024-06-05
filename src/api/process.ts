import { ProcessModel } from '@/models/process';
import axios, { AxiosError } from 'axios';


export interface dataCreateProcess{
    antUserId: string;
    requesterUserId: string;
    providerId: string;
    date?: string;
    plate: string;
    observations?: string;

}



interface Response {
  status: boolean;
  message: string;
  data?: any;
  process?: ProcessModel;
  processes?: ProcessModel[];
  code: number;
  accessToken?: string;
}

export async function createProcess({antUserId, 
    requesterUserId, providerId, date, plate, observations}: dataCreateProcess,  token: string): Promise<Response> {
    const  body: {[key: string] : string} = {
        antUserId : antUserId,
        requesterUserId : requesterUserId,
        providerId : providerId,
        plate: plate
    }
    if (date && date!=='') {
        body['date'] = date
    }
    if (observations && observations!=='') {
        body['observations'] = observations
    }
    console.log('body', body)
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/process`, {
      ...body
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const accessToken = response.data.accessToken;

    return {
      status: true,
      message: 'Proceso creado',
      data: response,
      accessToken: accessToken,
      code: 201,
    };

  } catch (error) {
    console.log('error',error);
    const axiosError = error as AxiosError;
    console.log('axiosError', axiosError)
    if (axiosError.response?.status === 401) {
      return {
        status: false,
        message: 'Error de autorización',
        code: 401,
      };
    }

    return {
      status: false,
      message: `${(axiosError.response?.data as any)?.message[0]}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}

export async function getProcess(
    page: number, 
    limit: number, 
    from: string, 
    to: string, 
    username: string, token: string): Promise<Response> {
      // &username=${username}
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/process?page=${page}&limit=${limit}&from=${from}&to=${to}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      const accessToken = response.data.accessToken;
      const listProcess = data.map((process: ProcessModel) => new ProcessModel().fromJson(process));
      // console.log(`listProcess: ${JSON.stringify(listProcess)}`);
  
      return {
        status: true,
        message: 'Se ha listado correctamente',
        data: response,
        processes: listProcess,
        accessToken: accessToken,
        code: 201,
      };
  
    } catch (error) {
      console.log(`error: ${JSON.stringify(error)}`);
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
        message: ` ${(axiosError.response?.data as any)?.message[0]}`,
        data: null,
        code: axiosError.response?.status ?? 500,
      accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
      };
    }
  }