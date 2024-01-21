import axios from "axios";
let refresh = false;
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: { 'Content-Type': 'application/json' }
});
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
     const response = await axios.post('http://localhost:8000/token/refresh/', {
                      refresh:localStorage.getItem('refresh_token')
                      },
               { headers: {'Content-Type': 'application/json'},});
     if (response.status === 200) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
       localStorage.setItem('access_token', response.data.access);
       localStorage.setItem('refresh_token', response.data.refresh);
       return axios(error.config);
    }  }
    refresh = false;
    return error;
});

export default axiosInstance;