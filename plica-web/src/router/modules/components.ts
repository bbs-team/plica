import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const componentsRouter: RouteConfig = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import(/* webpackChunkName: "tinymce" */ '@/views/demo/components-demo/tinymce.vue'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    {
      path: 'markdown',
      component: () => import(/* webpackChunkName: "markdown" */ '@/views/demo/components-demo/markdown.vue'),
      name: 'MarkdownDemo',
      meta: { title: 'markdown' }
    },
    {
      path: 'json-editor',
      component: () => import(/* webpackChunkName: "json-editor" */ '@/views/demo/components-demo/json-editor.vue'),
      name: 'JsonEditorDemo',
      meta: { title: 'jsonEditor' }
    },
    {
      path: 'split-pane',
      component: () => import(/* webpackChunkName: "split-pane" */ '@/views/demo/components-demo/split-pane.vue'),
      name: 'SplitPaneDemo',
      meta: { title: 'splitPane' }
    },
    {
      path: 'avatar-upload',
      component: () => import(/* webpackChunkName: "avatar-upload" */ '@/views/demo/components-demo/avatar-upload.vue'),
      name: 'AvatarUploadDemo',
      meta: { title: 'avatarUpload' }
    },
    {
      path: 'dropzone',
      component: () => import(/* webpackChunkName: "dropzone" */ '@/views/demo/components-demo/dropzone.vue'),
      name: 'DropzoneDemo',
      meta: { title: 'dropzone' }
    },
    {
      path: 'sticky',
      component: () => import(/* webpackChunkName: "sticky" */ '@/views/demo/components-demo/sticky.vue'),
      name: 'StickyDemo',
      meta: { title: 'sticky' }
    },
    {
      path: 'count-to',
      component: () => import(/* webpackChunkName: "count-to" */ '@/views/demo/components-demo/count-to.vue'),
      name: 'CountToDemo',
      meta: { title: 'countTo' }
    },
    {
      path: 'mixin',
      component: () => import(/* webpackChunkName: "component-mixin" */ '@/views/demo/components-demo/mixin.vue'),
      name: 'ComponentMixinDemo',
      meta: { title: 'componentMixin' }
    },
    {
      path: 'back-to-top',
      component: () => import(/* webpackChunkName: "back-to-top" */ '@/views/demo/components-demo/back-to-top.vue'),
      name: 'BackToTopDemo',
      meta: { title: 'backToTop' }
    },
    {
      path: 'draggable-dialog',
      component: () => import(/* webpackChunkName: "draggable-dialog" */ '@/views/demo/components-demo/draggable-dialog.vue'),
      name: 'DraggableDialogDemo',
      meta: { title: 'draggableDialog' }
    },
    {
      path: 'draggable-kanban',
      component: () => import(/* webpackChunkName: "draggable-kanban" */ '@/views/demo/components-demo/draggable-kanban.vue'),
      name: 'DraggableKanbanDemo',
      meta: { title: 'draggableKanban' }
    },
    {
      path: 'draggable-list',
      component: () => import(/* webpackChunkName: "draggable-list" */ '@/views/demo/components-demo/draggable-list.vue'),
      name: 'DraggableListDemo',
      meta: { title: 'draggableList' }
    },
    {
      path: 'draggable-select',
      component: () => import(/* webpackChunkName: "draggable-select" */ '@/views/demo/components-demo/draggable-select.vue'),
      name: 'DraggableSelectDemo',
      meta: { title: 'draggableSelect' }
    }
  ]
}

export default componentsRouter
