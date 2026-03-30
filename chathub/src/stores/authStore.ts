import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface User {
    id: string
    username: string
    avatarUrl: string | null
    status: 'online' | 'offline' | 'away'
    createdAt: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(loadUserFromStorage())
    const isLoading = ref(false)

    const isAuthenticated = computed(() => !!user.value)

    const displayName = computed(() => {
        return user.value?.username ?? 'Guest'
    })

    function login(username: string, avatarUrl?: string) {
        isLoading.value = true

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                user.value = {
                    id: crypto.randomUUID(),
                    username: username.trim(),
                    avatarUrl: avatarUrl?.trim() || null,
                    status: 'online',
                    createdAt: new Date().toISOString(),
                }

                saveUserToStorage(user.value)
                isLoading.value = false
                resolve()
            }, 800)
        })
    }

    function logout() {
        user.value = null
        localStorage.removeItem('chathub-user')
    }

    function updateProfile(updates: Partial<Pick<User, 'username' | 'avatarUrl'>>) {
        if (!user.value) return

        if (updates.username !== undefined) {
            user.value.username = updates.username.trim()
        }
        if (updates.avatarUrl !== undefined) {
            user.value.avatarUrl = updates.avatarUrl?.trim() || null
        }

        saveUserToStorage(user.value)
    }

    function updateStatus(status: User['status']) {
        if (!user.value) return
        user.value.status = status
        saveUserToStorage(user.value)
    }

    function loadUserFromStorage(): User | null {
        const data = localStorage.getItem('chathub-user')
        if (!data) return null
        try {
            return JSON.parse(data)
        } catch {
            return null
        }
    }

    function saveUserToStorage(userData: User) {
        localStorage.setItem('chathub-user', JSON.stringify(userData))
    }

    return {
        // State
        user,
        isLoading,
        // Getters
        isAuthenticated,
        displayName,
        // Actions
        login,
        logout,
        updateProfile,
        updateStatus,
    }
})