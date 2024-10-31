const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

interface Options { method: string, data?: RequestData, timeout?: number }
type RequestData =  Record<string, string> | FormData | XMLHttpRequestBodyInit;

function queryStringify(data: Record<string, string>) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return result + key + '=' + data[key] + (index < keys.length - 1 ? '&' : '');
    }, '?');
}

class MyFetch {
    get = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };
    put = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };
    post = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };
    delete = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
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
                method === METHODS.GET && !!data
                    ? (url + queryStringify(data as Record<string, string>))
                    : url,
            );

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

console.log(new MyFetch);