export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: number
  timestamp: string | number
  username: string
  price: number
  status: number
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}

export interface ICustomRouteData {
  name: string // the name field is required when using <keep-alive>, it should also match its component's name property
               // detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  path: string
  // redirect: string // if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: string[] // will control the page roles (allow setting multiple roles)
    title: string // the name showed in subMenu and breadcrumb (recommend set)
    icon: string // the icon showed in the sidebar
    noCache: boolean // if true, the page will not be cached (default is false)
    affix: boolean // if true, the tag will affix in the tags-view
  }
}
