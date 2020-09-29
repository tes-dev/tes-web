import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/class/list',
    method:'get',
    params:params
  })
}
export function deleteClass(id) {
  return request({
    url:'/class/delete/'+id,
    method:'post'
  })
}

export function createProductCate(data) {
  return request({
    url:'/productCategory/create',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/productCategory/update/'+id,
    method:'post',
    data:data
  })
}

export function getProductCate(id) {
  return request({
    url:'/productCategory/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/productCategory/list/withChildren',
    method:'get'
  })
}

export function createClass(data) {
  return request({
    url:'/class/create',
    method:'post',
    data: data
  })
}
