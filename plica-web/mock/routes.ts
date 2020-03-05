import { Response, Request } from 'express'
import { RouteConfig } from 'vue-router'

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

const routeList: RouteConfig[] = [
  {
    name: 'miso',
    path: '/dashboard/miso',
    meta: {
      roles: ['admin'],
      title: '석남 미소지움',
      icon: 'example',
      noCache: true,
      affix: true
    }
  },
  {
    name: 'test',
    path: '/dashboard/test',
    meta: {
      roles: ['admin', 'viewer'],
      title: '테스트 페이지',
      icon: 'example',
      noCache: true,
      affix: true
    }
  }
]

export const getCustomRoutes = (req: Request, res: Response) => {
  const { name } = req.query
  return res.json({
    code: 20000,
    data: {
      items: routeList
    }
  })
}

export const getCustomRouteByName = (req: Request, res: Response) => {
  const { name } = req.params
  console.log(name)
  const page = routeList.filter(page => {
    if (page.name !== undefined) {
      const lowerCaseName = page.name.toString().toLowerCase()
      return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
    }
  })
  if (page.length === 0) {
    return res.status(404).json({
      code: 50404,
      message: 'Not found: ' + name
    })
  }
  return res.json({
    code: 20000,
    data: {
      items: page
    }
  })
}

export const createCustomRoute = (req: Request, res: Response) => {
  const { name } = req.params
  const { route } = req.body
  for (const v of routeList) {
    if (v.name === name) {
      routeList.push(route)
      return res.json({
        code: 20000,
        data: {
          route
        }
      })
    }
  }
  return res.status(400).json({
    code: 50404,
    message: 'Not found: ' + name
  })
}

export const deletePage = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
