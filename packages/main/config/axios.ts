import axios from 'axios';

axios.defaults.baseURL = 'https://xcoins.co.uk/';
axios.defaults.responseType = 'json';
axios.defaults.params = {
    token: 'example'
}
axios.defaults.transformResponse = [(data) => {
    try {
        data = JSON.parse(data);
    } catch (e) {}

    if( data?.result && data.result.code !== 0 ) {
        throw new Error(data.result.message);
    }
    return data;
}]