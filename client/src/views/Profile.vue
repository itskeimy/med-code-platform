<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card elevation="8" class="mb-4">
          <v-card-item class="text-center pa-8">
            <v-avatar size="120" color="primary" class="mb-4">
              <v-icon size="80">mdi-account-circle</v-icon>
            </v-avatar>
            <h2 class="text-h4 mb-2">
              {{ user?.username || 'Пользователь' }}
            </h2>
            <p class="text-body-2 text-medium-emphasis mb-2">
              {{ user?.email }}
            </p>
            <v-chip
              color="secondary"
              variant="flat"
              prepend-icon="mdi-stethoscope"
              class="mt-2"
            >
              Изучающий спортивную медицину
            </v-chip>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card elevation="8" class="mb-4">
          <v-card-item>
            <div class="text-h5 mb-4">
              Статистика
            </div>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="text-center pa-4">
                  <v-icon size="48" color="primary" class="mb-2">mdi-check-circle</v-icon>
                  <div class="text-h3">{{ stats?.solvedProblems || 0 }}</div>
                  <div class="text-caption text-medium-emphasis">Решено задач</div>
                </div>
              </v-col>
              
              <v-col cols="12" sm="6">
                <div class="text-center pa-4">
                  <v-icon size="48" color="secondary" class="mb-2">mdi-star</v-icon>
                  <div class="text-h3">{{ stats?.totalScore || 0 }}</div>
                  <div class="text-caption text-medium-emphasis">Всего баллов</div>
                </div>
              </v-col>
            </v-row>

            <v-divider class="my-4" />

            <v-row>
              <v-col cols="12" sm="4">
                <div class="text-center">
                  <v-chip color="success" class="mb-2">Легко</v-chip>
                  <div class="text-h6">{{ stats?.solvedByDifficulty?.easy || stats?.solvedByDifficulty?.Easy || 0 }}</div>
                </div>
              </v-col>
              
              <v-col cols="12" sm="4">
                <div class="text-center">
                  <v-chip color="warning" class="mb-2">Средне</v-chip>
                  <div class="text-h6">{{ stats?.solvedByDifficulty?.medium || stats?.solvedByDifficulty?.Medium || 0 }}</div>
                </div>
              </v-col>
              
              <v-col cols="12" sm="4">
                <div class="text-center">
                  <v-chip color="error" class="mb-2">Сложно</v-chip>
                  <div class="text-h6">{{ stats?.solvedByDifficulty?.hard || stats?.solvedByDifficulty?.Hard || 0 }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>

        <v-card elevation="8">
          <v-card-item>
            <div class="text-h5 mb-4">
              Недавняя активность
            </div>
            <v-list>
              <v-list-item
                v-for="submission in recentSubmissions"
                :key="submission._id"
                :title="submission.problemTitle"
                :subtitle="`Баллы: ${submission.score} • ${new Date(submission.createdAt).toLocaleDateString('ru-RU')}`"
              >
                <template #prepend>
                  <v-icon :color="submission.isCorrect ? 'success' : 'warning'">
                    {{ submission.isCorrect ? 'mdi-check-circle' : 'mdi-alert-circle' }}
                  </v-icon>
                </template>
              </v-list-item>
              
              <v-list-item v-if="!recentSubmissions || recentSubmissions.length === 0">
                <v-list-item-title class="text-center text-medium-emphasis">
                  Пока нет активности
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'

const authStore = useAuthStore()
const user = ref(null)
const stats = ref(null)
const recentSubmissions = ref([])

const fetchProfile = async () => {
  try {
    const [profileResponse, statsResponse, submissionsResponse] = await Promise.all([
      api.get('/auth/me'),
      api.get('/users/stats'),
      api.get('/submissions/recent'),
    ])
    
    user.value = profileResponse.data
    stats.value = statsResponse.data
    recentSubmissions.value = submissionsResponse.data
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    // Fallback to authStore user
    user.value = authStore.currentUser
  }
}

onMounted(() => {
  fetchProfile()
})
</script>
