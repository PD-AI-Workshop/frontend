import axios from 'axios'

const $host = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

$host.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default $host
