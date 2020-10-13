import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/semester/list',
    method: 'get',
    params: params
  })
}

export function save(params) {
  return request({
    url: '/semester/create',
    method: 'post',
    params: params
  })
}

export function update(params) {
  return request({
    url: '/semester/updateEval',
    method: 'post',
    params: params
  })
}

export function deleteEval(params) {
  return request({
    url: '/semester/deleteEval',
    method: 'post',
    params: params
  })
}

export function deleteById(id) {
  return request({
    url: '/semester/delete/' + id,
    method: 'post',
  })
}
