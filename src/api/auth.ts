import axios, { AxiosError } from 'axios';
import { UserModel } from '../models/user_model';

interface Response {
  status: boolean;
  message: string;
  data?: any;
  user?: UserModel;
  code: number;
  accessToken?: string;
}

export async function login(username: string, password: string): Promise<Response> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      username,
      password,
    });

    const userModel = new UserModel();
    const user = userModel.fromJson(response.data.user);
    user.accessToken = response.data.accessToken;
    user.isUsingInitialPassword = response.data.isUsingInitialPassword;

    return {
      status: true,
      message: 'Login correcto',
      data: response,
      user: user,
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
      message: `Error al iniciar sesión ${(axiosError.response?.data as any)?.message}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}

export async function checkStatus(accessToken: string, ): Promise<Response> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-status`, {
      
    },{ headers: {
      Authorization: `Bearer ${accessToken}`,
    },}
   
    );

    const userModel = new UserModel();
    const user = userModel.fromJson(response.data.data);
    user.accessToken = response.data.accessToken;
    return {
      status: true,
      message: 'Datos correctos',
      data: response,
      user: user,
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
      message: `Error ${(axiosError.response?.data as any)?.message}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
  
}

export async function recoveryCode(email: string): Promise<Response> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-recovery-code/${email}`, {
      email,
    });

    const message = response.data.message[0];
    return {
      status: true,
      message: message,
      data: response,
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
      message: `Error al iniciar sesión ${(axiosError.response?.data as any)?.message}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}

export async function recoveryPassword(recoveryCode: string, newPassword: string): Promise<Response> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/recovery-password`, {
      recoveryCode,
      newPassword,
    });

    const message = response.data.message[0];
    return {
      status: true,
      message: message,
      data: response,
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
      message: `${(axiosError.response?.data as any)?.message}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}
export async function logout(token: string): Promise<Response> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    },{ headers: {
      Authorization: `Bearer ${token}`,
    }});

    return {
      status: true,
      message: 'Logout correcto',
      data: response,
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
      message: `${(axiosError.response?.data as any)?.message}`,
      data: null,
      code: axiosError.response?.status ?? 500,
    accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}

export async function updateUser(usermodel: UserModel, token: string, newPassword?: string, oldPassword?: string): Promise<Response> {

  try {
    let requestBody: { [key: string]: string | undefined } = {
      username: usermodel.username,
      name: usermodel.name,
      email: usermodel.email,
    };

    // Añadir newPassword y oldPassword al objeto de la petición si no son nulos o vacíos
    if (newPassword && newPassword.trim() !== '') {
      requestBody['oldPassword'] = newPassword;
    }
    if (oldPassword && oldPassword.trim() !== '') {
      requestBody['password'] = oldPassword;
    }

    console.log(`requestBody`, requestBody);

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, requestBody,
    { headers: {
      Authorization: `Bearer ${token}`,
    }}
    );


    return {
      status: true,
      message: 'Usuario actualizado',
      data: response,
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
      message: `${(axiosError.response?.data as any)?.message[0]}`,
      data: null,
      code: axiosError.response?.status ?? 500,
      accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}



