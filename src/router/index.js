import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../page/Login.vue')
  },
  {
    path: '/home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../page/Home.vue'),
    redirect: '/whManage',
    children: [
      {
        path: '/whManage',
        meta: {
          title: '仓库管理'
        },
        component: () =>
          import(/* webpackChunkName: "whManage" */ '../page/whManage/index.vue')
      },
      {
        path: '/whEntryTimeManage',
        meta: {
          title: '入库时间管理'
        },
        component: () =>
          import(/* webpackChunkName: "whEntryTimeManage" */ '../page/whEntryTimeManage/index.vue')
      },
      {
        path: '/whEntryManage',
        meta: {
          title: '入库管理'
        },
        component: () =>
          import(/* webpackChunkName: "whEntryManage" */ '../page/whEntryManage/index.vue')
      }

    ]
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "home" */ '../page/Home.vue'),
    redirect: '/whManage'
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// to 表示将要去往的页面
// from 表示来自哪个页面
// next 表示放行,可以默认直接放行,也可以指定路径
router.beforeEach((to, from, next) => {
  // 判断是否来自登录页面  是 则直接放行
  // if (to.path === '/login') return next()
  // const tokenStr = sessionStorage.getItem('token')
  // // 判断是否有 token  没有 token 则强制跳转回登录页面
  // if (!tokenStr) return next('/login')

  next()
})

export default router
