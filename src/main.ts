// import { initSubAppVue2 } from '@belloai/bello-mfe'
import { initSubAppVue2 } from '@/utils/mfe'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './router'
import store from './store'

Vue.config.productionTip = false

const {
  bootstrap: bootstrapFunc,
  mount: mountFunc,
  unmount: unmountFunc
} = initSubAppVue2({
  App,
  Vue,
  VueRouter,

  vueRouterProps: {
    subAppBase: '/login',
    routes
  },
  vueProps: {
    store
  }
})

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('LoginMicroApp bootstraped')

  bootstrapFunc()
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  mountFunc(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  unmountFunc()
}
