import axios from "axios";

export const pacientesApi = axios.create({
    baseURL: "http://10.42.119.230:3000/api"
});
