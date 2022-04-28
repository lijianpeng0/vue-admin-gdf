// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import NProgress from 'nprogress'

// 创建一个axios的实例
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: '/api/private/v1/' // 设置axios请求的基础的基础地址
})
// axios设置请求拦截器
service.interceptors.request.use(config => {
  const tokenStr = window.sessionStorage.getItem('token')
  if (tokenStr) {
    // 设置请求头中的 Authorization 字段
    config.headers.Authorization = tokenStr
  }
  // 开启进度条效果
  NProgress.start()
  return config
})

// axios设置响应拦截器
service.interceptors.response.use(response => {
  // 关闭进度条效果
  NProgress.done()
  return response // 拦截处理响应结果，直接返回需要的数据
}, err => {
  console.log(err)
})

export default service // 导出axios实例
