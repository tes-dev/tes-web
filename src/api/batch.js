import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/semester/list',
    method: 'get',
  })
}
