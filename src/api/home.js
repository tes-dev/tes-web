import request from '@/utils/request'

export function selectStudent() {
  return request({
    url: '/user/selectStudent',
    method: 'get',
  })
}

export function selectTeacher() {
  return request({
    url: '/user/selectTeacher',
    method: 'get',
  })
}

export function selectClass() {
  return request({
    url: '/user/selectClass',
    method: 'get',
  })
}

export function selectDepartment() {
  return request({
    url: '/user/selectDepartment',
    method: 'get',
  })
}


