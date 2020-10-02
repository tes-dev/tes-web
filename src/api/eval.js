import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: '/eval/courseList/' + id,
    method: 'get',
  })
}


