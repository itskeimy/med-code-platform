<template>
  <div>
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="64" />
      </v-col>
    </v-row>

    <v-row v-else-if="problem" class="mt-2">
      <v-col cols="12" md="7">
        <v-card elevation="8" class="mb-4">
          <v-card-item>
            <div class="d-flex align-center mb-3">
              <v-avatar size="40" color="primary" class="mr-3">
                <v-icon>
                  {{ problem.type === 'quiz' ? 'mdi-format-list-checks' : 'mdi-text-box' }}
                </v-icon>
              </v-avatar>
              <div>
                <div class="text-h5 font-weight-medium">
                  {{ problem.title }}
                </div>
                <div class="text-caption text-medium-emphasis">
                  Клинический случай • Спортивная медицина
                </div>
              </div>
            </div>
          
            <div class="mb-3">
              <v-chip
                size="small"
                :color="getDifficultyColor(problem.difficulty)"
                class="mr-2"
              >
                {{ getDifficultyLabel(problem.difficulty) }}
              </v-chip>
              <v-chip
                size="small"
                variant="outlined"
              >
                {{ problem.type === 'quiz' ? 'Тест' : 'Текст' }}
              </v-chip>
            </div>

            <div class="text-body-1 mb-4">
              {{ problem.description }}
            </div>

            <div v-if="problem.mediaUrl" class="mt-6">
              <h3 class="text-h6 mb-4">Визуализация</h3>
              <v-img
                :src="`http://localhost:5000/uploads/${problem.mediaUrl}`"
                max-height="380"
                contain
                rounded="lg"
              />
            </div>

            <div v-if="problem.type === 'quiz' && problem.options" class="mt-6">
              <h3 class="text-h6 mb-4">Выберите наиболее подходящую тактику лечения</h3>
              <v-radio-group v-model="selectedOption">
                <v-radio
                  v-for="(option, index) in problem.options"
                  :key="index"
                  :label="option"
                  :value="option"
                />
              </v-radio-group>
            </div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card elevation="8" class="mb-4">
          <v-card-item>
            <div class="text-subtitle-1 mb-1">
              Отправить ответ
            </div>
            <div class="text-caption text-medium-emphasis mb-4">
              Объясните своё рассуждение или выберите лучший вариант.
            </div>
            <v-textarea
              v-if="problem.type === 'text'"
              v-model="userAnswer"
              label="Ваш диагноз/Ответ"
              variant="outlined"
              rows="8"
              placeholder="Введите ваш диагноз или анализ здесь..."
            />

            <v-text-field
              v-else
              v-model="userAnswer"
              label="Ваш ответ"
              variant="outlined"
              :placeholder="selectedOption || 'Введите или выберите вариант'"
            />

            <v-btn
              color="primary"
              size="large"
              block
              class="mt-4"
              :loading="submitting"
              :disabled="!userAnswer"
              @click="submitAnswer"
            >
              Отправить на проверку
            </v-btn>
          </v-card-item>
        </v-card>

        <v-card
          v-if="result"
          elevation="8"
          color="surface-variant"
          class="mt-2"
        >
          <v-card-item>
            <div class="d-flex align-center mb-2">
              <v-icon :color="result.success ? 'success' : 'warning'" class="mr-2">
                {{ result.success ? 'mdi-check-circle' : 'mdi-alert-circle' }}
              </v-icon>
              <div class="text-subtitle-1">
                {{ result.success ? 'Правильный ответ' : 'Не совсем верно' }}
              </div>
            </div>
            
            <v-chip
              :color="result.success ? 'success' : 'warning'"
              class="mb-4"
              variant="flat"
            >
              {{ result.message }}
            </v-chip>
            
            <div v-if="result.scoreEarned" class="mt-2">
              <h4 class="text-subtitle-2 mb-1">Начислено баллов</h4>
              <p class="text-body-2">{{ result.scoreEarned }} баллов</p>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const problem = ref(null)
const loading = ref(false)
const submitting = ref(false)
const userAnswer = ref('')
const selectedOption = ref('')
const result = ref(null)

const getDifficultyColor = (difficulty) => {
  const colors = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'error',
    easy: 'success',
    medium: 'warning',
    hard: 'error',
  }
  return colors[difficulty] || 'info'
}

const getDifficultyLabel = (difficulty) => {
  const labels = {
    Easy: 'Легко',
    Medium: 'Средне',
    Hard: 'Сложно',
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно',
  }
  return labels[difficulty] || difficulty
}

const fetchProblem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/problems/${route.params.id}`)
    problem.value = response.data
  } catch (error) {
    console.error('Failed to fetch problem:', error)
  } finally {
    loading.value = false
  }
}

const submitAnswer = async () => {
  submitting.value = true
  result.value = null
  
  try {
    const response = await api.post('/submissions', {
      problemId: route.params.id,
      answer: userAnswer.value,
    })
    result.value = response.data
  } catch (error) {
    console.error('Failed to submit answer:', error)
  } finally {
    submitting.value = false
  }
}

watch(selectedOption, (newVal) => {
  if (newVal) {
    userAnswer.value = newVal
  }
})

onMounted(() => {
  fetchProblem()
})
</script>
