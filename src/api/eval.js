import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/evaluation/findCourse',
    method: 'get',
    params: params
  })
}


