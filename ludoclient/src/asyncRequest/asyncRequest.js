import axios from 'axios';

function asyncRequest({ url, method = 'get', headers, body, params }) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url,
                method,
                headers,
                data: body,
                params
            });
            resolve(res.data);
        } catch (err) {
            reject(err);
        }
    });
}

export default asyncRequest;