// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'

// 创建一个axios的实例
const service = axios.create({
  baseURL: '/service' // 设置axios请求的基础的基础地址
})
// axios设置请求拦截器
service.interceptors.request.use(config => {
  const tokenStr = window.sessionStorage.getItem('token')
  if (tokenStr) {
    // 设置请求头中的 Authorization 字段
    config.headers.Authorization = tokenStr
  }
  return config
})

// axios设置响应拦截器
service.interceptors.response.use(response => {
  return response // 拦截处理响应结果，直接返回需要的数据
}, err => {
  console.log(err)
})

export default service // 导出axios实例
