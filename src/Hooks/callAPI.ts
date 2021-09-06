import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {useEffect, useState} from "react";

export enum AXIOS_METHODS {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch'
}

interface IUseCallApiConfig {
    url: string;
    method?: AXIOS_METHODS,
    body?: AxiosRequestConfig['data'],
    headers?: AxiosRequestConfig['headers']
}

interface IUseCallApi<T> {
    response: T | null,
    error: AxiosError | null,
    isLoading: boolean
}

export const useCallApi = <T>({url,  method = AXIOS_METHODS.GET, body = null, headers = null}: IUseCallApiConfig): IUseCallApi<T> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const config: AxiosRequestConfig = {
        url: `${process.env.REACT_APP_API_URL}/${url}`,
        method: method,
        data: body,
        headers: headers
    }

    const fetchData = async () => {
        try {
            const result = await axios.request(config);
            setResponse(result.data);
        } catch( error ) {
            setError(error as AxiosError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, isLoading };
}
