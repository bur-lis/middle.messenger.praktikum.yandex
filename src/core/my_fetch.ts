import { HTTPMethod, Options, } from "./type";

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

function queryStringify(data: Record<string, string>) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return result + key + '=' + data[key] + (index < keys.length - 1 ? '&' : '');
    }, '?');
}

const api_versions = 'https://ya-praktikum.tech/api/v2';

class MyFetch {
    get: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.GET }, options?.timeout);
    };
    put: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);
    };
    post: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.POST }, options?.timeout);
    };
    delete: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);
    };


    request = (url: string, options: Options, timeout = 5000) => {
        const { method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }
            if (method === METHODS.GET && data instanceof FormData) {
                reject('The get method cannot be used to submit the form');
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open(
                method,

                api_versions + url + (method === METHODS.GET && !!data ? queryStringify(data as Record<string, string>) : '')

            );

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            }
            else if (data instanceof FormData) {
                xhr.send(data);
            }
            else {
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default new MyFetch(); 
