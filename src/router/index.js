import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import sourceData from '@/data.json'

const routes = [
  {path: '/', name: 'Home', component: Home, alias: '/home'},    
  /* {path: '/home', redirect: {name: 'Home'}},     */
  {
    path: '/protected',
    name: 'protected',
    components: {
      default: () => import('@/views/Protected.vue'),
      LeftSidebar: () => import('@/components/LeftSidebar.vue'),
    },
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/invoices',
    name: 'invoices',
    components:  {
      default: () => import('@/views/Invoices.vue'),
      LeftSidebar: () => import('@/components/LeftSidebar.vue'),
    },
    meta: {
      requiresAuth: true,
    }
  },
  //{path: '/about', name: 'About', component: About},
  {
    // route example using regular expressions (in this case, only digits)
    path: "/example/:id(\\d+)",
  },
  {
    // route example using regular expressions, i.e., /example/1/2/3/4
    path: "/example/:id+",
    /* path: "/example/:id(\\d+)+", */ // also possible
    /* path: "/example/:id(\\d+)*", */ // * means optional and repeatable
    /* path: "/example/:id(\\d+)?", */ // ? means optional
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/destination/:id/:slug', 
    name: 'destination.show', 
    component: ()=>import('@/views/DestinationShow.vue'),
    props: route=>({...route.params, id: parseInt(route.params.id)}),
    beforeEnter(to, from) {
      const exists = sourceData.destinations.find(
        destination => destination.id === parseInt(to.params.id)
      )

      // To keep the url 
      if (!exists) return {
        name: 'NotFound',
        params: { pathMatch: to.path.split('/').slice(1) },
        query: to.query,
        hash: to.hash,
      }
    },
    children: [
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/ExperienceShow.vue'),
        props: route => ({...route.params, id: parseInt(route.params.id)})
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // Vue 3
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(), 
  linkActiveClass: 'travel-app-active-link',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0, behavior: 'smooth' }), 300)
    })
    //return { top: null, left: null, behavior: null }
  }
})

router.beforeEach((to, from) => {
  // global navigation guard
  if (to.meta.requiresAuth && !window.user) {
    // need to login if not already logged in
    console.log('requires redirect: ')
    console.log(to)
    return {
      name: 'login',
      query: {
        redirect: to.path
      }
    }
  }
})

export default router;