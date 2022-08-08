import request from './index'

export function login(params) {
  return request({
    url: '/account/login',
    method: 'POST',
    params
  })
}

// 分页查询仓库
export function getWarehouse(params) {
  return request({
    url: '/warehouse/query',
    method: 'POST',
    params
  })
}

// 新增仓库
export function addWarehouse(params) {
  return request({
    url: '/warehouse/create',
    method: 'POST',
    params
  })
}

// 修改仓库
export function editWarehouse(params) {
  return request({
    url: '/warehouse/update',
    method: 'POST',
    params
  })
}

// 删除仓库
export function deleteWarehouse(params) {
  return request({
    url: '/warehouse/delete',
    method: 'POST',
    params
  })
}

// 分页查询入库时间
export function getStockoutOrderTime(params) {
  return request({
    url: '/dateParam/query',
    method: 'POST',
    params
  })
}

// 新增入库时间
export function addStockoutOrderTime(params) {
  return request({
    url: '/dateParam/create',
    method: 'POST',
    params
  })
}

// 删除入库时间
export function deleteStockoutOrderTime(params) {
  return request({
    url: '/dateParam/delete',
    method: 'POST',
    params
  })
}

// 修改入库时间
export function editStockoutOrder(params) {
  return request({
    url: '/stockoutOrder/update',
    method: 'POST',
    params
  })
}

// 新增入库预约
export function addStockoutOrder(params) {
  return request({
    url: '/stockoutOrder/create',
    method: 'POST',
    params
  })
}

// 查询入库预约
export function getStockoutOrder(params) {
  return request({
    url: '/stockoutOrder/query',
    method: 'POST',
    params
  })
}
