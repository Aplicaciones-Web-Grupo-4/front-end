import axios from 'axios';
const BASE_URL = import.meta.env.VITE_LEARNING_PLATFORM_API_URL;
export class BaseApi {
    #http;
    constructor() {
        this.#http = axios.create({ baseURL: BASE_URL });
    }
    get http() { return this.#http; }
}
