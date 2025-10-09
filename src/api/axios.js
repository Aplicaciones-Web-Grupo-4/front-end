import axios from 'axios'

const api = axios.create({
    baseURL: 'https://db-server-1-66zf.onrender.com',
})

export default api
