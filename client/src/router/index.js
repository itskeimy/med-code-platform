import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/auth/AuthPage.vue'),
        meta: { requiresGuest: true },
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/problem/:id',
        name: 'Problem',
        component: () => import('../views/ProblemView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/auth')
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router
