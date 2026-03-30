<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useChatStore } from '@/stores/chatStore'
import BaseAvatar from '@/components/common/BaseAvatar.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const chatStore = useChatStore()
const { user } = storeToRefs(authStore)
const { totalUnreadCount } = storeToRefs(chatStore)

const navItems = [
    { name: 'chat', label: 'Chats', icon: '💬', path: '/chat', showBadge: true },
    { name: 'contacts', label: 'Contacts', icon: '👥', path: '/contacts', showBadge: false },
    { name: 'settings', label: 'Settings', icon: '⚙️', path: '/settings', showBadge: false },
]

const currentSection = computed(() => {
    return route.matched[1]?.name || 'chat'
})

function handleLogout() {
    authStore.logout()
    router.push({ name: 'login' })
}
</script>

<template>
    <div class="app-layout">
        <aside class="sidebar">
            <div class="sidebar__header">
                <span class="sidebar__logo-icon">💬</span>
                <span class="sidebar__logo-text">ChatHub</span>
            </div>

            <nav class="sidebar__nav">
                <RouterLink v-for="item in navItems" :key="item.name" :to="item.path" class="nav-item"
                    :class="{ 'nav-item--active': currentSection === item.name }">
                    <span class="nav-item__icon">{{ item.icon }}</span>
                    <span class="nav-item__label">{{ item.label }}</span>
                    <BaseBadge v-if="item.showBadge" :count="totalUnreadCount" variant="danger"
                        class="nav-item__badge" />
                </RouterLink>
            </nav>

            <div class="sidebar__footer">
                <div class="sidebar__user">
                    <BaseAvatar :src="user?.avatarUrl || ''" :name="user?.username || ''" size="sm" status="online" />
                    <span class="sidebar__username">{{ user?.username || 'Guest' }}</span>
                </div>
                <button class="sidebar__logout" @click="handleLogout" title="Logout">
                    🚪
                </button>
            </div>
        </aside>

        <main class="main-content">
            <RouterView />
        </main>
    </div>
</template>

<style scoped>
.app-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
}

.sidebar {
    width: var(--sidebar-width);
    min-width: var(--sidebar-width);
    background: var(--color-bg-secondary);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
}

.sidebar__header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
}

.sidebar__logo-icon {
    font-size: var(--font-size-lg);
}

.sidebar__logo-text {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-info) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.sidebar__nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md);
    overflow-y: auto;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-base);
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    transition:
        background-color var(--transition-fast),
        color var(--transition-fast);
    cursor: pointer;
}

.nav-item:hover {
    background: var(--color-bg-hover);
    color: var(--color-text-primary);
}

.nav-item--active {
    background: var(--color-accent-light);
    color: var(--color-accent);
}

.nav-item__icon {
    font-size: var(--font-size-lg);
    width: 28px;
    text-align: center;
}

.nav-item__label {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
}

.nav-item__badge {
    margin-left: auto;
}

.sidebar__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-base) var(--space-lg);
    border-top: 1px solid var(--color-border);
    flex-shrink: 0;
}

.sidebar__user {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
}

.sidebar__username {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sidebar__logout {
    padding: var(--space-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-base);
    transition: background-color var(--transition-fast);
    flex-shrink: 0;
}

.sidebar__logout:hover {
    background: var(--color-bg-hover);
}

.main-content {
    flex: 1;
    display: flex;
    overflow: hidden;
    background: var(--color-bg-primary);
}
</style>