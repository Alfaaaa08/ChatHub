import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'dark' | 'light'

export interface NotificationPrefs {
    enabled: boolean
    sound: boolean
    preview: boolean
}

export const useSettingsStore = defineStore('settings', () => {
    const theme = ref<Theme>(loadSetting('chathub-theme', 'dark'))
    const notifications = ref<NotificationPrefs>(
        loadSetting('chathub-notifications', {
            enabled: true,
            sound: true,
            preview: true,
        }),
    )

    watch(
        theme,
        (newTheme) => {
            localStorage.setItem('chathub-theme', JSON.stringify(newTheme))
        },
    )

    watch(
        notifications,
        (newPrefs) => {
            localStorage.setItem('chathub-notifications', JSON.stringify(newPrefs))
        },
        { deep: true },
    )

    function setTheme(newTheme: Theme) {
        theme.value = newTheme
    }

    function toggleTheme() {
        theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }

    function updateNotifications(updates: Partial<NotificationPrefs>) {
        Object.assign(notifications.value, updates)
    }

    function resetSettings() {
        theme.value = 'dark'
        notifications.value = { enabled: true, sound: true, preview: true }
    }

    function loadSetting<T>(key: string, fallback: T): T {
        const data = localStorage.getItem(key)
        if (!data) return fallback
        try {
            return JSON.parse(data) as T
        } catch {
            return fallback
        }
    }

    return {
        theme,
        notifications,
        setTheme,
        toggleTheme,
        updateNotifications,
        resetSettings,
    }
})