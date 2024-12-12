import axios from 'axios'

const baseUrl = '/api'

// axios二次封装的核心

class HttpReauest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {
                'content-type': 'application/json'
            }
        }
        return config
    }
    interception() {
        // 请求前拦截
        axios.interceptors.request.use(
                config => {
                    //在请求发出之前进行一些操作
                    return config
                },
                error => {
                    // 对请求错误做些什么
                    return Promise.reject(error)
                }
            )
            // 请求后拦截
        axios.interceptors.response.use(
            response => {
                // 对响应数据做点什么
                return response
            },
            error => {
                // 对响应错误做点什么
                return Promise.reject(error)
            }
        )
    }

    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        return instance(options)
    }

}
const instance = new HttpReauest(baseUrl);

export default instance