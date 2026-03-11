import { AxiosResponse } from 'axios';
import TSAPI from './TSAPI';

export default class APIService {
    static callAPI(config: any, onSuccess: AxiosResponse['data'] = (response: AxiosResponse) => response && response.data) {
        return TSAPI.callAPI(config, onSuccess);
    }
}

const APIPromise = (config: any) =>
    new Promise((resolve, reject) => {
        APIService.callAPI(config, (response: AxiosResponse) => {
            if (response.status === 200) resolve(response);
            else reject(response);
        }).catch(error => reject(error));
    });

export { APIPromise };