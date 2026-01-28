<template>
  <v-container class="auth-container">
    <v-row align="stretch" justify="center">
      <v-col cols="12" md="6" class="d-none d-md-flex">
        <v-card elevation="10" class="pa-8 auth-promo" color="surface">
          <div class="text-overline mb-2 text-primary">Спортивная медицина</div>
          <div class="text-h4 mb-4 font-weight-bold">
            Клинические случаи в интерактивном формате
          </div>
          <div class="text-body-2 text-medium-emphasis mb-6">
            Практикуйтесь в диагностике и принятии решений о лечении на реальных сценариях:
            переломы, повреждения связок, сотрясения мозга и многое другое. Отслеживайте свой прогресс
            и развивайте клиническую интуицию.
          </div>
          <v-divider class="my-4" />
          <div class="d-flex flex-wrap ga-3">
            <v-chip color="primary" variant="flat" prepend-icon="mdi-brain">
              Клиническое мышление
            </v-chip>
            <v-chip color="secondary" variant="flat" prepend-icon="mdi-dumbbell">
              Спортивные травмы
            </v-chip>
            <v-chip color="success" variant="flat" prepend-icon="mdi-progress-star">
              Отслеживание прогресса
            </v-chip>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="10" md="6" lg="4">
        <v-card elevation="14" class="auth-card">
          <v-card-title class="text-center pa-6">
            <v-icon size="56" color="primary" class="mb-3">mdi-medical-bag</v-icon>
            <div class="text-h5 font-weight-medium mb-1">Платформа спортивной медицины</div>
            <div class="text-caption text-medium-emphasis">
              Войдите для доступа к интерактивным клиническим задачам
            </div>
          </v-card-title>
          
          <v-tabs v-model="tab" grow color="primary" density="comfortable">
            <v-tab value="login">Вход</v-tab>
            <v-tab value="register">Регистрация</v-tab>
          </v-tabs>

          <v-card-text class="pa-6">
            <v-window v-model="tab">
              <v-window-item value="login">
                <v-form @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="loginForm.email"
                    label="Email"
                    type="email"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="loginForm.password"
                    label="Пароль"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    variant="outlined"
                    required
                    class="mt-4"
                  ></v-text-field>
                  <v-alert
                    v-if="error"
                    type="error"
                    class="mt-4"
                    variant="tonal"
                  >
                    {{ error }}
                  </v-alert>
                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    class="mt-6"
                    :loading="loading"
                  >
                    Войти
                  </v-btn>
                </v-form>
              </v-window-item>

              <v-window-item value="register">
                <v-form @submit.prevent="handleRegister">
                  <v-text-field
                    v-model="registerForm.username"
                    label="Имя пользователя"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="registerForm.email"
                    label="Email"
                    type="email"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    required
                    class="mt-4"
                  ></v-text-field>
                  <v-text-field
                    v-model="registerForm.password"
                    label="Пароль"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    variant="outlined"
                    required
                    class="mt-4"
                  ></v-text-field>
                  <v-alert
                    v-if="error"
                    type="error"
                    class="mt-4"
                    variant="tonal"
                  >
                    {{ error }}
                  </v-alert>
                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    class="mt-6"
                    :loading="loading"
                  >
                    Зарегистрироваться
                  </v-btn>
                </v-form>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const tab = ref('login')
const loading = ref(false)
const error = ref(null)
const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  username: '',
  email: '',
  password: '',
})

const handleLogin = async () => {
  loading.value = true
  error.value = null
  
  const result = await authStore.login(loginForm.value.email, loginForm.value.password)
  
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error
  }
  
  loading.value = false
}

const handleRegister = async () => {
  loading.value = true
  error.value = null
  
  const result = await authStore.register(
    registerForm.value.username,
    registerForm.value.email,
    registerForm.value.password
  )
  
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error
  }
  
  loading.value = false
}
</script>

<style scoped>
.auth-container {
  max-width: 1200px;
}

.auth-card {
  backdrop-filter: blur(16px);
}

.auth-promo {
  border-radius: 24px;
}
</style>
