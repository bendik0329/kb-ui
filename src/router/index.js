import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser} from '@/auth/utils'
import apps from './routes/apps'
import auth from './routes/auth'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'

//
import sales from './routes/kloudrealty/sales'
import approvals from './routes/kloudrealty/approvals'
import marketing from './routes/kloudrealty/marketing'
import education from './routes/kloudrealty/education-page'
import organization from './routes/kloudrealty/organization'
import propertyManagement from './routes/kloudrealty/property-management'
import me from './routes/kloudrealty/me'
import settings from './routes/kloudrealty/settings'
import axios from 'axios'

import kloudrealtyRoute from './routes/kloudrealty'
//access-control



Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/',
      meta: {
        layout: 'full',
        resource: 'ACL',
        action: 'read',
      }, 
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      component: () => import('@/views/home/HomeLayout.vue'),
      meta: {
        layout: 'full',
        resource: 'ACL',
        action: 'read',
      },
      children:[
      {
        path:'/home',
        name:'home',
        component: () => import('@/views/home/components/HomePage.vue'),
        meta: {
          layout: 'full',
          resource: 'ACL',
          action: 'read',
        }
      },
      {
        path:'/faq',
        name:'faq',
        component: () => import('@/views/home/components/Faq.vue'),
        meta: {
          layout: 'full',
          resource: 'ACL',
          action: 'read',
        }
      },
      {
        path:'/findAgent',
        name:'findAgent',
        component: () => import('@/views/home/components/FindAgent.vue'),
        meta: {
          layout: 'full',
          resource: 'ACL',
          action: 'read',
        }
      },
      {
        path:'/joinUsPage',
        name:'joinUsPage',
        component: () => import('@/views/home/components/JoinUsPage.vue'),
        meta: {
          layout: 'full',
          resource: 'ACL',
          action: 'read',
        }
      }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue'),
      meta: {
        layout: 'full',
        resource: 'ACL',
        action: 'read',
      },
    },
    {
      path: '/new-user/register',
      name: 'register',
      component: () => import('@/views/register/RegisterPage.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        action: 'read',
      },
    },
    {
      path: '/new-user/register/success',
      name: 'register-success',
      component: () => import('@/views/register/RegisterSuccess.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        action: 'read',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        resource: 'ACL',
        action: 'read',
      },
    },
    ...kloudrealtyRoute,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})


router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  // console.log("to",to)
  // console.log("from", _)
  console.log('can?', canNavigate(to))
  if (!canNavigate(to)) {
    console.log('no access')
    return next({ name: 'error-404' })
    //return next({ name: 'home' })
    // Redirect to login if not logged in
    // if (!isLoggedIn) return next({ name: 'home' })

    // If logged in => not authorized
  }
  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }
  

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
// router.afterEach(() => {
//   // Remove initial loading
//   const appLoading = document.getElementById('loading-bg')
//   if (appLoading) {
//     appLoading.style.display = 'none'
//   }
// })

export default router
