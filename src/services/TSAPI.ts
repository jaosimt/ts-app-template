import axios, { AxiosResponse } from 'axios';
import { ApplicationError } from '../class';

import { setError } from '../slices/error';
import { store } from '../store';
import { isString } from '../utils';

axios.defaults.withCredentials = true; // A must for Backend's express-session
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000;
// axios.defaults.baseURL = 'https://pos.jaosimt.com:8181/api'; // Production
axios.defaults.baseURL = 'http://127.0.0.1:7777/api'; // Local

/*
 * --- Request interceptor ---
 *  axios.interceptors.request.use(function (config) {
 *  	// Do something before request is sent
 *  	return config;
 *  }, function (error) {
 *  	// Do something with request error
 *  	return Promise.reject(error);
 *  });
 */

// --- Response interceptor ---
axios.interceptors.response.use(
    res => res,
    err => {
        const {
                response: { status: statusCode, statusText } = { status: err?.request?.status || 0, statusText: err?.request?.statusText || '' },
                code,
                name,
                message,
                stack
            } = err,
            dataMessage = err?.response?.data?.message,
            error = new ApplicationError({
                code,
                statusCode,
                name,
                message:
                    dataMessage ||
                    (isString(statusText, true)
                        ? `${statusText}.  Please contact solution provider!`
                        : message),
                stack: stack.replace(
                    /^(AxiosError@|handleError@|.*xhr.*|dispatchRequest@|request@|wrap@|performSyncWorkOnRoot@|.*node_modules|@http|__webpack|\.\/|fn@|performWorkUntilDeadline@|flushWork@|options\.factory@|workLoop@|performConcurrentWorkOnRoot@|finishConcurrentRender@|commitRoot[impl]*@|flushSyncCallbacks@).*$/gim,
                    '---'
                )
            });

        if (
            error?.code === 'ERR_NETWORK' ||
            [429, 500].includes(Number(error?.code)) ||
            [429, 500].includes(error?.statusCode)
        ) {
            store.dispatch(setError(error));
        }

        return Promise.reject(error);
    }
);

class TSAPI {
    static async callAPI(config: any, onSuccess = (response: AxiosResponse) => response && response.data) {
        return await axios(config).then(onSuccess);
    }
}

export default TSAPI;