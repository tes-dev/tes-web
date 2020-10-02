import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/indicator/list',
    method: 'get',
    params: params
  })
}
