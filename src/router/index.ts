import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('~/pages/login/index.vue')


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
})

export default router