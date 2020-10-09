import request from '@/utils/request'

export function getClassList() {
  return request({
    url: '/class/list',
    method: 'get',
  })
}

export function fetchList(params) {
  return request({
    url: '/class/list',
    method: 'get',
    params: params
  })
}
export function deleteClass(id) {
  return request({
    url: '/class/delete/' + id,
    method: 'post'
  })
}

export function createProductCate(data) {
  return request({
    url: '/productCategory/create',
    method: 'post',
    data: data
  })
}

export function updateProductCate(id, data) {
  return request({
    url: '/productCategory/update/' + id,
    method: 'post',
    data: data
  })
}

export function getProductCate(id) {
  return request({
    url: '/productCategory/' + id,
    method: 'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url: '/productCategory/update/showStatus',
    method: 'post',
    data: data
  })
}

export function createClass(data) {
  return request({
    url: '/class/create',
    method: 'post',
    data: data
  })
}

export function updateClass(id,data) {
  return request({
    url: '/class/update/'+ id,
    method: 'post',
    data: data
  })
}
