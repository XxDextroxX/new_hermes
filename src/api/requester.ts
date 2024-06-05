import axios, { AxiosError } from 'axios';

import { RequesterModel } from '@/models/requesters';

interface Response {
  status: boolean;
  message: string;
  data?: any;
  requester?: RequesterModel;
  requesters?: RequesterModel[];
  code: number;
  accessToken?: string;
}

export async function createRequester(name: string, token: string): Promise<Response> {
console.log(`token: ${token}  name: ${name}`);
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/requester/`, {
      name,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`response Create: ${JSON.stringify(response.data)}`);
    const requesterModel = new RequesterModel();
    const requester = requesterModel.fromJson(response.data.data);
    const accessToken = response.data.accessToken;

    return {
      status: true,
      message: `Se ha creado el solicitante ${requester.name}`,
      data: response,
      requester: requester,
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

export async function getRequesters(token: string): Promise<Response> {
  console.log('Me ejecute requester');
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requester/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.data;
    const accessToken = response.data.accessToken;
    const listRequester = data.map((requester: RequesterModel) => new RequesterModel().fromJson(requester));

    return {
      status: true,
      message: 'Se ha listado correctamente',
      data: response,
      requesters: listRequester,
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

export async function deleteRequesters(id: string, token: string): Promise<Response> {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/requester/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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