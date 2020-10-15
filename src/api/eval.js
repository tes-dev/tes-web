import request from '@/utils/request'

export function eval2(id,data) {
  return request({
    url: '/eval/otherCourseList/' + id,
    method: 'get',
    data:data
  })
}

export function fetchList(id,data) {
  return request({
    url: '/eval/courseList/' + id,
    method: 'get',
    data:data
  })
}

export function evalItem(params) {
  return request({
    url: '/eval/startEvaluation',
    method: 'post',
    params: params
  })
}

export function commitEval(params) {
  return request({
    url: '/evalResult/commit',
    method: 'post',
    params: params
  })
}

export function getEvalControlList() {
  return request({
    url: '/eval/control/list',
    method: 'get',
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/eval/control/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function getEvalList(id) {
  return request({
    url: '/eval/evalItem/' + id,
    method: 'get',
  })
}



