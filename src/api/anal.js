import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/indicator/list',
    method: 'get',
    params: params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/indicator/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteIndicator(id) {
  return request({
    url: '/indicator/delete/' + id,
    method: 'post'
  })
}

export function updateIndicator(id, data) {
  return request({
    url: '/indicator/update/' + id,
    method: 'post',
    data: data
  })
}

export function createIndicator(data) {
  return request({
    url: '/indicator/create',
    method: 'post',
    data: data
  })
}
