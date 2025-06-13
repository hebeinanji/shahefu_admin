import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Domain from '@/views/DomainView.vue'
import Ssl from '@/views/SslsView.vue'
import Login from '@/views/LoginView.vue'

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true }},
  { path: '/about', component: About,meta: { requiresAuth: true } },
  { path: '/domain', component: Domain,meta: { requiresAuth: true } },
  { path: '/ssl', component: Ssl,meta: { requiresAuth: true } },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ 路由守卫：拦截未登录用户
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})


export default router