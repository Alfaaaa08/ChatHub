<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseAvatar from '@/components/common/BaseAvatar.vue'

const router = useRouter()

const username = ref('')
const avatarUrl = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const isFormValid = computed(() => {
  return username.value.trim().length >= 2
})

function handleLogin() {
  if (!isFormValid.value) {
    errorMessage.value = 'Username must be at least 2 characters'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  setTimeout(() => {
    const user = {
      id: crypto.randomUUID(),
      username: username.value.trim(),
      avatarUrl: avatarUrl.value.trim() || null,
      status: 'online' as const,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem('chathub-user', JSON.stringify(user))
    isLoading.value = false
    router.push('/')
  }, 800)
}

function clearError() {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">
          <span class="logo-icon">💬</span>
          <h1 class="logo-text">ChatHub</h1>
        </div>
        <p class="login-subtitle">Enter your details to start chatting</p>
      </div>

      <div class="avatar-section">
        <BaseAvatar :src="avatarUrl" :name="username" size="xl" />
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <BaseInput v-model="username" label="Username" placeholder="How should we call you?" :error="errorMessage"
          autocomplete="off" @focus="clearError" />

        <BaseInput v-model="avatarUrl" label="Avatar URL" hint="(optional)"
          placeholder="https://example.com/your-avatar.png" type="url" />

        <BaseButton type="submit" variant="primary" size="lg" :loading="isLoading" :disabled="!isFormValid">
          Enter ChatHub →
        </BaseButton>
      </form>

      <p class="login-footer">
        No account needed — just pick a name and go
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  background:
    radial-gradient(ellipse at 20% 50%, rgba(108, 92, 231, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(116, 185, 255, 0.06) 0%, transparent 50%),
    var(--color-bg-primary);
}

.login-container {
  width: 100%;
  max-width: 420px;
  padding: var(--space-2xl);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.logo-icon {
  font-size: var(--font-size-2xl);
}

.logo-text {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-info) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-xl);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.login-footer {
  text-align: center;
  margin-top: var(--space-xl);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}
</style>