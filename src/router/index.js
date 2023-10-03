import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

     {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
       path: '/dashbord',
       name: 'dashbord',
       component: () => import('../views/HomeView.vue'),
       children: [   
          {
            path: '/dashbord/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
          },
          {
            path: '/dashbord/addInstruction',
            name: 'instuction',
            component: () => import('../views/AddInstruction.vue')
          },
          {
            path: '/dashbord/instructionList',
            name: 'instructionList',
            component: () => import('../views/InstructionList.vue')
           },
        ]
    }
  ]
})

export default router
