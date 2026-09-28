import axios from "axios"
import { useAuthContext } from "../auth/context/authProvider"

const useAPI = ()=>{
    const {accessToken, setAccessToken} = useAuthContext()

    const api = axios.create({
        baseURL: "http://localhost:5173/api",
        withCredentials: true,
    })

    api.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    }) 

    api.interceptors.response.use(
        response => response,
        async (error)=>{
            if (error.response && error.response.status === 401){
                const res = await axios.post('/api/auth/refresh')
                setAccessToken(res.data.accessToken)

                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`

                return axios(error.config)
            }
            return Promise.reject(error)
        }
    )

    return api
}

export default useAPI