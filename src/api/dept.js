import request from '@/utils/request'

export function getDeptList() {
  return request({
    url: '/dept/list',
    method: 'get',
  })
}
export function fetchList(params) {//查看学院
  return request({
    url: '/dept/list',
    method: 'get',
    params: params
  })
}
export function updateAdmin(id, data) {//修改学院
  return request({
    url: '/dept/update/' + id, //跳转地址
    method: 'post',   //方法
    data: data    //数据
  })
}
export function deleteAdmin(id) { //删除学院
  return request({
    url: '/dept/deleteByid/' + id,
    method: 'post'
  })
}
export function createAdmin(data) { //添加学院
  return request({
    url: '/dept/insert',
    method: 'post',
    data: data
  })
}
