import request from '@/utils/request'

export function fetchAllSemesterList(params) {
  return request({
    url: '/semester/list',
    method: 'get',
    params: params
  })
}

export function allSemesterList() {
  return request({
    url: 'semester/all',
    method: 'get',
  })
}

