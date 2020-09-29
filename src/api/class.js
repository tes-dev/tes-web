import request from '@/utils/request'

export function getClassList() {
  return request({
    url: '/class/list',
    method: 'get',
  })
}

export function fetchList(params) {//查看班级
  return request({
    url: '/class/list',
    method: 'get',
    params: params
  })
}
export function updateClass(id, data) {//修改班级
  return request({
    url: '/class/update/' + id, //跳转地址
    method: 'post',   //方法
    data: data    //数据
  })
}
export function deleteClass(id) { //删除班级
  return request({
    url: '/class/delete/' + id,
    method: 'post'
  })
}
export function createClass(data) { //添加班级
  return request({
    url: '/class/create',
    method: 'post',
    data: data
  })
}
