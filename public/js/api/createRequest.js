/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method === 'GET') {
        let strUrl = `${options.url}?`;
        for (let key in options.data) {
            strUrl += `${key}=${options.data[key]}&`;
        }
        const url = strUrl.slice(0, -1);

        xhr.open(options.method, url);

        xhr.send();
    } else {
        let formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }

        xhr.open(options.method, options.url);

        xhr.send(formData);
    }
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            options.callback(null, xhr.response);
        }

        if (xhr.readyState === 4 && xhr.status !== 200) {
            options.callback(xhr.response.error, xhr.response);
        }
    });

};
