import request from './index'

// 封装登录请求 按需导出
export function login(data) {
  // 返回一个 promise 对象
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户基础信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 获取用户详细信息
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
