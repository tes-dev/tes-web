import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/indicator/list',
    method: 'get',
    params: params
  })
}

export function getAllIndexList() {
  return request({
    url: '/indicator/all',
    method: 'get',
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/indicator/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteIndicator(id) {
  return request({
    url: '/indicator/delete/' + id,
    method: 'post'
  })
}

export function updateIndicator(id, data) {
  return request({
    url: '/indicator/update/' + id,
    method: 'post',
    data: data
  })
}

export function createIndicator(data) {
  return request({
    url: '/indicator/create',
    method: 'post',
    data: data
  })
}

export function getCount(courseId,data) {
  return request({
    url: '/course/getCount/'+ courseId,
    method: 'get',
    data: data
  })
}

export function evaluatedCount(courseId,data) {
  return request({
    url: '/evalResult/evaluatedCount/'+ courseId,
    method: 'get',
    data: data
  })
}

export function getAllCount(courseId,data) {
  return request({
    url: '/course/getAllCount/'+ courseId,
    method: 'get',
    data: data
  })
}

export function getAllMark(courseId,data) {
  return request({
    url: '/evalResult/getAllMark/'+ courseId,
    method: 'get',
    data: data
  })
}
