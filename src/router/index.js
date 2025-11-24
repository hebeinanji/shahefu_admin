import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from "/src/utils/auth";
import Home from '@/views/HomeView.vue'
import Domain from '@/views/DomainView.vue'
import Ssl from '@/views/SslsView.vue'
import Recipe from '@/views/RecipeView.vue'
import RecipeInfo from '@/views/RecipeInfoView.vue'
import LoginView from "@/views/LoginView.vue"
import FeedbackView from '@/views/FeedbackView.vue'
import UserAdminView  from '@/views/UserAdminView.vue'
import AdminInfoView  from '@/views/AdminInfoView.vue'
import UserView from '@/views/UserView.vue'
import NavSiteView from '@/views/NavSiteView.vue'
import HolidayView from '@/views/HolidayView.vue'
import HolidayInfoView from '@/views/HolidayInfoView.vue'

const routes = [
  {name: 'home', path: '/', component: Home, meta: { requiresAuth: true }},
  {name: 'login', path: '/login', component: LoginView,meta: { requiresAuth: false } },
  {name: 'domain', path: '/domain', component: Domain,meta: { requiresAuth: true } },
  {name: 'ssl', path: '/ssl', component: Ssl,meta: { requiresAuth: true } },
  {name: 'recipe', path: '/recipe', component: Recipe,meta: { requiresAuth: true } },
  {name: 'recipe_info', path: '/recipe_info', component: RecipeInfo,meta: { requiresAuth: true } },
  {name: 'holiday', path: '/holiday', component: HolidayView,meta: { requiresAuth: true } },
  {name: 'holiday_info', path: '/holiday_info', component: HolidayInfoView,meta: { requiresAuth: true } },
  {name: 'feedback', path: '/feedback', component: FeedbackView,meta: { requiresAuth: true } },
  {name: 'user_admin', path: '/user_admin', component:UserAdminView,meta: { requiresAuth: true } },
  {name: 'admin_info', path: '/admin_info', component:AdminInfoView,meta: { requiresAuth: true } },
  {name: 'user', path: '/user', component:UserView,meta: { requiresAuth: true } },
  {name: 'nav_site', path: '/nav_site', component:NavSiteView,meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ 路由守卫：拦截未登录用户
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})


export default router