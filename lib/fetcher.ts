import axios, { AxiosRequestConfig } from 'axios';

const fetcher = (config: AxiosRequestConfig) =>
    axios(config).then((res) => res.data);

export default fetcher;
