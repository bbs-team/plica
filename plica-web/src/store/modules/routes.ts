import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'
import { getCustomRoutes, createCustomRoute } from '@/api/routes'
import { UserModule } from '@/store/modules/user'
import { ICustomRouteData } from '@/api/types'

export interface ICustomRoute {
  name: string // the name field is required when using <keep-alive>, it should also match its component's name property
               // detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  path: string
  // redirect: string // if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: string[] // will control the page roles (allow setting multiple roles)
    title: string // the name showed in subMenu and breadcrumb (recommend set)
    icon: string // the icon showed in the sidebar
    // if false, hide the root menu when has less or equal than one children route
    noCache: boolean // if true, the page will not be cached (default is false)
  }
}

export interface ICustomRouteState {
  route: ICustomRoute[]
}

@Module({ dynamic: true, store, name: 'customRoute' })
class CustomRoute extends VuexModule implements ICustomRouteState {
  public route: ICustomRoute[] = []

  @Mutation
  private ADD_ROUTE(data: ICustomRoute[]) {
    let _this = this
    data.forEach(function(value) {
      _this.route.push(value)
    })
  }

  @Action
  public async GetCustomRoute() {
    let { data } = await getCustomRoutes()
    if (!data) {
      throw Error('Error in getCustomRoutes()')
    }
    let self = this
    data.items.forEach(function(value: ICustomRoute) {
      self.route.push(value)
    })
    console.log(this.route)
  }

  @Action
  public async CreateCustomRoutes(data: ICustomRouteData) {
    // Dynamically modify permissions

    await createCustomRoute(data)
    await this.GetCustomRoute()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(UserModule.roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }
}

export const CustomRouteModule = getModule(CustomRoute)
