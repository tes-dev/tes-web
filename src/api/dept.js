import request from '@/utils/request'

export function getDeptList() {
  return request({
    url: '/dept/list',
    method: 'get',
  })
}
