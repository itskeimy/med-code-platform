<template>
  <v-app>
    <template v-if="isAuthPage">
      <v-main class="auth-main medical-bg">
        <router-view />
      </v-main>
    </template>

    <template v-else>
      <v-app-bar
        color="surface"
        elevation="4"
        density="comfortable"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer" />

        <v-toolbar-title>
          <v-btn
            variant="text"
            class="d-flex align-center px-0"
            style="text-transform: none"
            @click="$router.push('/')"
          >
            <v-icon class="mr-2" color="primary">mdi-medical-bag</v-icon>
            <span class="font-weight-medium brand-title">Платформа спортивной медицины</span>
          </v-btn>
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          variant="text"
          class="mr-2"
          prepend-icon="mdi-view-dashboard"
          @click="$router.push('/')"
        >
          Задачи
        </v-btn>

        <v-btn
          variant="text"
          class="mr-4"
          prepend-icon="mdi-account-circle"
          @click="$router.push('/profile')"
        >
          Профиль
        </v-btn>

        <v-btn
          color="primary"
          variant="flat"
          prepend-icon="mdi-logout"
          @click="handleLogout"
        >
          Выйти
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        elevation="4"
      >
        <v-sheet class="pa-4 d-flex align-center">
          <v-avatar color="primary" size="40" class="mr-3">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-medium">
              {{ currentUser?.username || 'Гость' }}
            </div>
            <div class="text-caption text-medium-emphasis">
              {{ currentUser?.email || 'Не авторизован' }}
            </div>
          </div>
        </v-sheet>

        <v-divider />

        <v-list nav density="comfortable">
          <v-list-item
            prepend-icon="mdi-view-dashboard-outline"
            title="Клинические задачи"
            to="/"
          />
          <v-list-item
            prepend-icon="mdi-account-heart"
            title="Профиль"
            to="/profile"
          />
        </v-list>

        <v-spacer />

        <v-divider />

        <v-list>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Выйти"
            @click="handleLogout"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main class="app-main medical-bg">
        <v-container class="py-8">
          <router-view />
        </v-container>
      </v-main>
    </template>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const drawer = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isAuthPage = computed(() => route.path === '/auth')
const currentUser = computed(() => authStore.currentUser)

const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}
</script>

<style scoped>
.app-main {
  min-height: 100vh;
}

.auth-main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
