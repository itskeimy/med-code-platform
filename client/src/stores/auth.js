import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user,
    },

    actions: {
        async register(username, email, password) {
            try {
                const response = await api.post('/auth/register', { username, email, password })
                this.token = response.data.token
                this.user = response.data.user
                localStorage.setItem('token', this.token)
                return { success: true }
            } catch (error) {
                return { success: false, error: error.response?.data?.message || 'Registration failed' }
            }
        },

        async login(email, password) {
            try {
                const response = await api.post('/auth/login', { email, password })
                this.token = response.data.token
                this.user = response.data.user
                localStorage.setItem('token', this.token)
                return { success: true }
            } catch (error) {
                return { success: false, error: error.response?.data?.message || 'Login failed' }
            }
        },

        async fetchUser() {
            try {
                const response = await api.get('/auth/me')
                this.user = response.data
            } catch (error) {
                this.logout()
            }
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
        },
    },
})
