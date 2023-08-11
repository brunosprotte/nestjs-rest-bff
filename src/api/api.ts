import axios from "axios"

export const api = () => {
    return axios.create({
        baseURL: 'http://backend.com/api/',
        timeout: 1000,
    })
}