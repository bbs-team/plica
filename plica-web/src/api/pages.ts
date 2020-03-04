import request from '@/utils/request'
import { IPageData } from './types'
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

export const getPages = () =>
  request({
    url: '/pages',
    method: 'get'
  })

export const getPage = (name: number) =>
  request({
    url: `/pages/${name}`,
    method: 'get'
  })
