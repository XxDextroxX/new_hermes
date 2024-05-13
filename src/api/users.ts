import axios, { AxiosError } from 'axios';
import { UserModel } from '../models/user_model';
import { UserAnt } from '@/models/user_ant';

interface Response {
  status: boolean;
  message: string;
  data?: any;
  user?: UserModel;
  users?: UserModel[];
  code: number;
  accessToken?: string;
}
interface ResponseUserAnt {
  status: boolean;
  message: string;
  data?: any;
  user?: UserAnt;
  users?: UserAnt[];
  code: number;
  accessToken?: string;
}

export async function getAllUsers(accessToken: string): Promise<Response> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/list-all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },}
      );
  
      const data = response.data.data;
      const token = response.data.accessToken;
      const listUser = data.map((user: UserModel) => new UserModel().fromJson(user));
   
  
      return {
        status: true,
        message: 'Usuarios encontrados',
        data: response,
        users: listUser,
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
export async function getAllUsersDigitadores(accessToken: string): Promise<Response> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/list-digitadores`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },}
      );
  
      const data = response.data.data;
      const token = response.data.accessToken;
      const listUser = data.map((user: UserModel) => new UserModel().fromJson(user));
   
  
      return {
        status: true,
        message: 'Usuarios encontrados',
        data: response,
        users: listUser,
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
export async function adminUsers(accessToken: string, username: string, isActive: boolean): Promise<Response> {
    let path:string = "";
    if (isActive) {
      path = `${process.env.NEXT_PUBLIC_API_URL}/auth/${username}/activate`;
    }else{
      path = `${process.env.NEXT_PUBLIC_API_URL}/auth/${username}/deactivate`;
    }
    try {
      const response = await axios.post(path, {
     }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
     }
      );
  
      const message = response.data.data.message[0];
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
export async function createUsers(accessToken: string, name: string, username: string, email: string, role:string): Promise<Response> {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name: name,
        username: username,
        email: email,
        role: role
     }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
     }
      );
  
      const message = response.data.data.message[0];
      const token = response.data.accessToken;
      const user = new UserModel().fromJson(response.data.data.user);
   
  
      return {
        status: true,
        message: message,
        data: response,
        user: user,
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

export async function createUsersAnt(accessToken: string, username: string, owner: string): Promise<ResponseUserAnt> {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ant-user`, {
        username: username,
        owner: null
     }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
     }
      );
  
      const token = response.data.accessToken;
      const user = new UserAnt().fromJson(response.data.data);
      return {
        status: true,
        message: 'Usuario creado',
        data: response,
        user: user,
        code: 201,
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
export async function getUsersAnt(accessToken: string): Promise<ResponseUserAnt> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ant-user`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },}
      );
      const token = response.data.accessToken;
      const users = response.data.data.map((user: any) => new UserAnt().fromJson(user));
      return {
        status: true,
        message: 'Usuarios obtenidos',
        data: response,
        users: users,
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
export async function deleteUsersAnt(accessToken: string, id: string): Promise<ResponseUserAnt> {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/ant-user/${id}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },}
      );

      const token = response.data.accessToken;
      return {
        status: true,
        message: 'Usuario eliminado',
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