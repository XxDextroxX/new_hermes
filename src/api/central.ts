import axios, { AxiosError } from 'axios';
import FormData from 'form-data';

interface Response {
    message?: string;
    messages?: string[];
    error?: string;
    status: boolean;
    accessToken: string;
    data?: {
      message: string[];
    };
    code: number;
}

export async function uploadExcelReport(token: string, file: Blob, filename: string): Promise<Response> {
    console.log(` token: ${token}, file: ${file}, filename: ${filename}`);
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/payment-orders/upload-evidence`;
    const formData = new FormData();
    formData.append('file', file, {
      filename: filename,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const response = await axios.post(url, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(`response: ${JSON.stringify(response)}`);


    const message = response.data.data.message[0];
    const accessToken = response.data.accessToken;

    return {
      status: true,
      message: message,
      data: response.data,
      accessToken: accessToken,
      code: 201,
    };
  } catch (error) {
    console.log('error:', error);
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      return {
        status: false,
        message: 'Error de autenticación',
        code: 401,
        accessToken: '',
      };
    }
    return {
      status: false,
      messages: (axiosError.response?.data as any)?.message,
      code: axiosError.response?.status ?? 500,
      accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}
export async function uploadAntReport(token: string, file: Blob, filename: string): Promise<Response> {
    console.log(` token: ${token}, file: ${file}, filename: ${filename}`);
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/anomalies/upload-report`;
    const formData = new FormData();
    formData.append('file', file, {
      filename: filename,
      contentType: 'application/pdf',
    });

    const response = await axios.post(url, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(`response: ${JSON.stringify(response)}`);


    const message = response.data.data.message[0];
    const accessToken = response.data.accessToken;

    return {
      status: true,
      message: message,
      data: response.data,
      accessToken: accessToken,
      code: 201,
    };
  } catch (error) {
    console.log('error:', error);
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      return {
        status: false,
        message: 'Error de autenticación',
        code: 401,
        accessToken: '',
      };
    }
    return {
      status: false,
      messages: (axiosError.response?.data as any)?.message,
      code: axiosError.response?.status ?? 500,
      accessToken: `${(axiosError.response?.data as any)?.accessToken}`,
    };
  }
}
