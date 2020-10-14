import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/user',
    name: 'ums',
    meta: { title: '权限', icon: 'ums' },
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/ums/user/index'),
      meta: { title: '用户列表', icon: 'ums-admin' }
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/ums/role/index'),
      meta: { title: '角色列表', icon: 'ums-role' }
    },
    {
      path: 'per',
      name: 'per',
      component: () => import('@/views/ums/permission/index'),
      meta: { title: '权限列表', icon: 'ums-resource' }
    },
    {
      path: 'menu',
      name: 'menu',
      component: () => import('@/views/ums/menu/index'),
      meta: { title: '菜单列表', icon: 'ums-menu' }
    },
    {
      path: 'addMenu',
      name: 'addMenu',
      component: () => import('@/views/ums/menu/add'),
      meta: { title: '添加菜单' },
      hidden: true
    },
    {
      path: 'updateMenu',
      name: 'updateMenu',
      component: () => import('@/views/ums/menu/update'),
      meta: { title: '修改菜单' },
      hidden: true
    },
    {
      path: 'allocMenu',
      name: 'allocMenu',
      component: () => import('@/views/ums/role/allocMenu'),
      meta: { title: '分配菜单' },
      hidden: true
    }
    ]
  },
  {
    path: '/tms',
    component: Layout,
    redirect: '/tms/dept',
    name: 'tms',
    meta: { title: '教学管理', icon: 'tms' },
    children: [{
      path: 'dept',
      name: 'dept',
      component: () => import('@/views/lms/department/index'),
      meta: { title: '学院管理', icon: 'tms-dept' }
    },
    {
      path: 'class',
      name: 'class',
      component: () => import('@/views/lms/class/index'),
      meta: { title: '班级管理', icon: 'tms-class' }
    },
    {
      path: 'course',
      name: 'course',
      component: () => import('@/views/lms/course/index'),
      meta: { title: '课程管理', icon: 'tms-course' }
    },

    ]
  },
  {
    path: '/ems',
    component: Layout,
    redirect: '/ems/batch',
    name: 'ems',
    meta: { title: '评教管理', icon: 'ems' },
    children: [{
      path: 'batch',
      name: 'batch',
      component: () => import('@/views/ems/batch/index'),
      meta: { title: '批次管理', icon: 'ems-batch' }
    },
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/ems/index/index'),
      meta: { title: '指标管理', icon: 'tms-index' }
    },
    {
      path: 'anal',
      name: 'anal',
      component: () => import('@/views/ems/anal/index'),
      meta: { title: '统计分析', icon: 'tms-anal' }
    },
    {
      path: 'vChart',
      name: 'vChart',
      component: () => import('@/views/ems/anal/vChart'),
      meta: {title: '课程评教情况'},
      hidden: true
    }
    ]
  },
  {
    path: '/ems',
    component: Layout,
    redirect: '/eval',
    name: 'eval',
    meta: { title: '评教', icon: 'ems' },
    children: [
      {
        path: 'eval1',
        name: 'eval1',
        component: () => import('@/views/ems/eval/index'),
        meta: { title: '参加评教', icon: 'ems' }
      },
      {
        path: 'eval2',
        name: 'eval2',
        component: () => import('@/views/ems/eval/index'),
        meta: { title: '同行评教', icon: 'ems' }
      },
      {
        path: 'eval3',
        name: 'eval3',
        component: () => import('@/views/ems/eval/index'),
        meta: { title: '查看评教情况', icon: 'ems-anal' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

