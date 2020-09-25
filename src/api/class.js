import request from '@/utils/request'

export function getClassList() {
  return request({
    url: '/class/list',
    method: 'get',
  })
}
