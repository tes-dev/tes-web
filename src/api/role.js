import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/role/insert',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/role/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, data) {
  return request({
    url: '/role/updateStatus/' + id,
    method: 'post',
    data: data
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/deleteByid/' + id,
    method: 'post',
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/role/findAll',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/role/listMenu/' + roleId,
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/role/listResource/' + roleId,
    method: 'get'
  })
}

export function allocMenu(data) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data: data
  })
}

export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data: data
  })
}
