<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="12" md="8">
        <div class="glass-card accent-ring pa-6 rounded-xl">
          <div class="text-overline text-primary mb-1">Клиническая подготовка</div>
          <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
            Интерактивные случаи спортивной медицины
          </h1>
          <p class="text-body-2 text-medium-emphasis">
            Выберите случай, проанализируйте клиническую картину и примите решение о диагностике и лечении.
            Разработано для студентов-медиков, ординаторов и специалистов по спортивной медицине.
          </p>
          <div class="d-flex flex-wrap ga-2 mt-4">
            <v-chip color="primary" variant="flat" prepend-icon="mdi-heart-pulse">Жизненные показатели</v-chip>
            <v-chip color="secondary" variant="flat" prepend-icon="mdi-bone">Травмы</v-chip>
            <v-chip color="info" variant="flat" prepend-icon="mdi-brain">Неврология</v-chip>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-end align-end">
        <v-chip
          color="secondary"
          variant="elevated"
          prepend-icon="mdi-progress-clock"
        >
          {{ tasks.length }} доступных случаев
        </v-chip>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="64" />
      </v-col>
    </v-row>

    <v-row v-else class="dashboard-grid">
      <v-col
        v-for="task in tasks"
        :key="task._id"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          class="task-card glass-card accent-ring"
          elevation="10"
          @click="$router.push(`/problem/${task._id}`)"
        >
          <v-card-item>
            <div class="d-flex align-center mb-2">
              <v-avatar size="34" color="primary" class="mr-3">
                <v-icon>
                  {{ task.type === 'quiz' ? 'mdi-format-list-checks' : 'mdi-text-box' }}
                </v-icon>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-weight-medium">
                  {{ task.title }}
                </div>
                <div class="text-caption text-medium-emphasis">
                  Клинический случай • основано на доказательствах
                </div>
              </div>
            </div>

            <div class="mb-3">
              <v-chip
                size="small"
                :color="getDifficultyColor(task.difficulty)"
                class="mr-2"
              >
                {{ getDifficultyLabel(task.difficulty) }}
              </v-chip>
              <v-chip
                size="small"
                variant="outlined"
              >
                {{ task.type === 'quiz' ? 'Тест' : 'Текст' }}
              </v-chip>
            </div>

            <div class="text-body-2 text-medium-emphasis">
              {{ truncateText(task.description, 140) }}
            </div>
          </v-card-item>

          <v-card-actions class="pt-0">
            <v-spacer />
            <v-btn
              color="primary"
              variant="tonal"
              append-icon="mdi-arrow-right"
            >
              Открыть случай
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.task-card {
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}
.task-card:hover {
  transform: translateY(-2px);
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const tasks = ref([])
const loading = ref(false)

const getDifficultyColor = (difficulty) => {
  const colors = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'error',
  }
  return colors[difficulty] || 'info'
}

const getDifficultyLabel = (difficulty) => {
  const labels = {
    Easy: 'Легко',
    Medium: 'Средне',
    Hard: 'Сложно',
  }
  return labels[difficulty] || difficulty
}

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const fetchTasks = async () => {
  loading.value = true
  try {
    const response = await api.get('/problems')
    tasks.value = response.data
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})
</script>
