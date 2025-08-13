import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Domain from '@/views/DomainView.vue'
import Ssl from '@/views/SslsView.vue'
import Recipe from '@/views/RecipeView.vue'
import RecipeInfo from '@/views/RecipeInfoView.vue'
import Login from '@/views/LoginView.vue'

const routes = [
  {name: 'home', path: '/', component: Home, meta: { requiresAuth: true }},
  {name: 'domain', path: '/domain', component: Domain,meta: { requiresAuth: true } },
  {name: 'ssl', path: '/ssl', component: Ssl,meta: { requiresAuth: true } },
  {name: 'recipe', path: '/recipe', component: Recipe,meta: { requiresAuth: true } },
  {name: 'recipe_info', path: '/recipe_info', component: RecipeInfo,meta: { requiresAuth: true } },
  {name: 'login', path: '/login', component: Login }
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