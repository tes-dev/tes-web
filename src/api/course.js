import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url:'/course/list',
    method:'get',
    params:params
  })
}

export function createAdmin(data) {
  return request({
    url: '/course/create',
    method: 'post',
    data: data
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/course/delete/' + id,
    method: 'post'
  })
}

export function updateCourse(id, data) {
  return request({
    url: '/course/update/' + id,
    method: 'post',
    data: data
  })
}

