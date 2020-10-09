import request from '@/utils/request'

export function fetchAllSemesterList(params) {
  return request({
    url:'/semester/list',
    method:'get',
    params:params
  })
}

