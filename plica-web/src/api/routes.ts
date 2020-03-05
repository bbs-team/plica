import request from '@/utils/request'
import { ICustomRouteData } from './types'
import { RouteConfig } from 'vue-router'

export const defaultPageData: RouteConfig = {
  name: '',
  path: '',
  redirect: '',
  meta: {
    roles: [''],
    title: '',
    icon: '',
    hidden: false,
    alwaysShow: true,
    breadcrumb: true,
    noCache: true,
    affix: true,
    activeMenu: ''
  }
}

export const getCustomRoutes = () =>
  request({
    url: '/pageRoutes',
    method: 'get'
  })

export const getCustomRoute = (name: number) =>
  request({
    url: `/pageRoutes/${name}`,
    method: 'get'
  })

export const createCustomRoute = (body: ICustomRouteData) =>
  request({
    url: `/pageRoutes`,
    method: 'post',
    data: body
  })
