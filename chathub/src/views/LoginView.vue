<script setup lang="ts">

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const avatarUrl = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const isFormValid = computed(() => {
  return username.value.trim().length >= 2
})

const avatarPreview = computed(() => {
  if (avatarUrl.value.trim()) {
    return avatarUrl.value.trim()
  }

  return ''
})

const userInitials = computed(() => {
  const name = username.value.trim()
  if (!name) return '?'

  const parts = name.split(' ')
  if (parts && parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  return name[0].toUpperCase()
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
      <!-- HEADER -->
      <div class="login-header">
        <div class="logo">
          <span class="logo-icon">💬</span>
          <h1 class="logo-text">ChatHub</h1>
        </div>
        <p class="login-subtitle">Enter your details to start chatting</p>
      </div>

      <!-- AVATAR PREVIEW -->
      <div class="avatar-section">
        <img v-if="avatarPreview" :src="avatarPreview" :alt="username || 'Avatar'" class="avatar-image"
          @error="avatarUrl = ''" />

        <div v-else class="avatar-placeholder">
          {{ userInitials }}
        </div>
      </div>

      <!-- FORMULÁRIO -->
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- USERNAME INPUT -->
        <div class="form-field">
          <label for="username" class="form-label">Username</label>
          <input id="username" v-model="username" type="text" placeholder="How should we call you?" class="form-input"
            autocomplete="off" @input="clearError" />
        </div>

        <!-- AVATAR URL INPUT -->
        <div class="form-field">
          <label for="avatar" class="form-label">
            Avatar URL
            <span class="form-label-optional">(optional)</span>
          </label>
          <input id="avatar" v-model="avatarUrl" type="url" placeholder="https://example.com/your-avatar.png"
            class="form-input" />
        </div>

        <!-- ERROR MESSAGE -->
        <p v-if="errorMessage" class="form-error">
          {{ errorMessage }}
        </p>

        <!-- SUBMIT BUTTON -->
        <button type="submit" class="form-button" :disabled="!isFormValid || isLoading"
          :class="{ 'form-button--loading': isLoading }">
          <span v-if="isLoading" class="button-content">
            <span class="spinner" />
            Connecting...
          </span>
          <span v-else class="button-content">
            Enter ChatHub →
          </span>
        </button>
      </form>

      <!-- FOOTER -->
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

/* ── Header ── */
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

/* ── Avatar ── */
.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-xl);
}

.avatar-image,
.avatar-placeholder {
  width: 88px;
  height: 88px;
  border-radius: var(--radius-full);
  border: 3px solid var(--color-border-light);
  transition: border-color var(--transition-base);
}

.avatar-image {
  object-fit: cover;
}

.avatar-image:hover,
.avatar-placeholder:hover {
  border-color: var(--color-accent);
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  user-select: none;
}

/* ── Form ── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.form-label-optional {
  color: var(--color-text-muted);
  font-weight: var(--font-weight-normal);
}

.form-input {
  height: var(--input-height);
  padding: 0 var(--space-base);
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-light);
}

.form-error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  padding: var(--space-sm) var(--space-md);
  background: rgba(225, 112, 85, 0.1);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--color-danger);
}

/* ── Button ── */
.form-button {
  height: var(--input-height);
  padding: 0 var(--space-lg);
  background: var(--color-accent);
  color: var(--color-accent-text);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-md);
  transition:
    background-color var(--transition-fast),
    transform var(--transition-fast),
    opacity var(--transition-fast);
}

.form-button:hover:not(:disabled) {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}

.form-button:active:not(:disabled) {
  transform: translateY(0);
}

.form-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-button--loading {
  cursor: wait;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

/* ── Spinner ── */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Footer ── */
.login-footer {
  text-align: center;
  margin-top: var(--space-xl);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}
</style>