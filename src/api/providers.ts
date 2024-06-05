import axios, { AxiosError } from 'axios';
import { ProvidersModel } from '@/models/providers';



interface Response {
  status: boolean;
  message: string;
  data?: any;
  provider?: ProvidersModel;
  providers?: ProvidersModel[];
  code: number;
  accessToken?: string;
}

export async function createProvider(name: string, details: string, token: string): Promise<Response> {
    const  body: {[key: string] : string} = {
        name : name,
    }
    if (details && details!=='') {
        body['details'] = details
    }
    
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/provider/`, {
      ...body
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`response Create: ${JSON.stringify(response.data)}`);
    const providerModel = new ProvidersModel();
    const provider = providerModel.fromJson(response.data.data);
    const accessToken = response.data.accessToken;

    return {
      status: true,
      message: `Se ha creado el solicitante ${provider.name}`,
      data: response,
      provider: provider,
      accessToken: accessToken,
      code: 201,
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
      message: `Error al iniciar sesión ${(axiosError.response?.data as any)?.message[0]}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}

export async function getProviders(token: string): Promise<Response> {
  console.log('Me ejecute provider');
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/provider/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.data;
    const accessToken = response.data.accessToken;
    const listProviders = data.map((requester: ProvidersModel) => new ProvidersModel().fromJson(requester));

    return {
      status: true,
      message: 'Se ha listado correctamente',
      data: response,
      providers: listProviders,
      accessToken: accessToken,
      code: 201,
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
      message: `Error al iniciar sesión ${(axiosError.response?.data as any)?.message[0]}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}

export async function deleteProviders(id: string, token: string): Promise<Response> {
    console.log(`deleteProviders: ${id}`);
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/provider/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`responseDeete: ${JSON.stringify(response.data)}`);
    const data = response.data.data;
    const accessToken = response.data.accessToken;


    return {
      status: true,
      message: 'Se ha eliminado correctamente',
      data: data,
      accessToken: accessToken,
      code: 201,
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
      message: `Error al iniciar sesión ${(axiosError.response?.data as any)?.message[0]}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}