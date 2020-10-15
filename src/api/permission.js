import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url:'/permission/list',
    method:'get',
    params:params
  })
}

export function createAdmin(data) {
  return request({
    url: '/permission/addPermission',
    method: 'post',
    data: data
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/permission/delete/' + id,
    method: 'post'
  })
}

export function updateStatus(id, data) {
  return request({
    url: '/permission/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteSelect(id) {
  return request({
    url: '/permission/deleteSelect/' + id,
    method: 'get'
  })
}

export function fetchTreeList() {
  return request({
    url: '/permission/treeList',
    method: 'get'
  })
}

