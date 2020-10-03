import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: '/eval/courseList/' + id,
    method: 'get',
  })
}

export function evalItem(data) {
  return request({
    url: '/eval/startEvaluation',
    method: 'post',
    data: data
  })
}


