import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import router, { resetRouter } from '@/router'
import store from '@/store'
import { getCustomRoutes, createCustomRoute } from '@/api/routes'
import { RouteConfig } from 'vue-router'
import { TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'

export interface ICustomRouteState {
  route: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'customRoute' })
class CustomRoute extends VuexModule implements ICustomRouteState {
  public route: RouteConfig[] = []

  @Mutation
  private ADD_CUSTOM_ROUTE(data: RouteConfig[]) {
    data.forEach(value => {
      this.route.push(value)
    })
  }

  @Mutation
  private DELETE_CUSTOM_ROUTES() {
    this.route = []
  }

  @Action
  public GetCustomRoute() {
    let _self = this

    getCustomRoutes().then(response => {
      _self.ADD_CUSTOM_ROUTE(response.data.items)
    }).catch(err => { console.log('route.ts/GetCustomRoute(): ', err) })
  }

  @Action
  public async CreateCustomRoutes(body: any) {
    // Dynamically modify permissions

    await createCustomRoute(body)
    let { data } = await getCustomRoutes()
    this.DELETE_CUSTOM_ROUTES()
    this.ADD_CUSTOM_ROUTE(data.items)

    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(UserModule.roles)
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }
}

export const CustomRouteModule = getModule(CustomRoute)
