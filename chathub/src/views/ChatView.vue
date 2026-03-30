<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const hasActiveRoom = computed(() => {
    return !!route.params.roomId
})
</script>

<template>
    <div class="chat-view">
        <div class="chat-view__rooms">
            <div class="rooms-header">
                <h2 class="rooms-header__title">Chats</h2>
            </div>

            <div class="rooms-list">
                <RouterLink v-for="room in ['general', 'random', 'dev-talk']" :key="room" :to="`/chat/${room}`"
                    class="room-item" :class="{ 'room-item--active': route.params.roomId === room }">
                    <span class="room-item__icon">💬</span>
                    <div class="room-item__info">
                        <span class="room-item__name">#{{ room }}</span>
                        <span class="room-item__preview">Click to open this room</span>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div class="chat-view__content">
            <RouterView v-if="hasActiveRoom" />

            <div v-else class="chat-placeholder">
                <span class="chat-placeholder__icon">💬</span>
                <h3 class="chat-placeholder__title">Select a room</h3>
                <p class="chat-placeholder__text">
                    Choose a room from the sidebar to start chatting
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-view {
    display: flex;
    width: 100%;
    height: 100%;
}

.chat-view__rooms {
    width: 280px;
    min-width: 280px;
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    background: var(--color-bg-secondary);
}

.rooms-header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
}

.rooms-header__title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
}

.rooms-list {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-sm);
}

.room-item {
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
    margin-bottom: var(--space-xs);
}

.room-item:hover {
    background: var(--color-bg-hover);
    color: var(--color-text-primary);
}

.room-item--active {
    background: var(--color-accent-light);
    color: var(--color-accent);
}

.room-item__icon {
    font-size: var(--font-size-lg);
    flex-shrink: 0;
}

.room-item__info {
    min-width: 0;
}

.room-item__name {
    display: block;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
}

.room-item__preview {
    display: block;
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.chat-view__content {
    flex: 1;
    display: flex;
    overflow: hidden;
}

.chat-placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-base);
    color: var(--color-text-muted);
}

.chat-placeholder__icon {
    font-size: 3rem;
    opacity: 0.3;
}

.chat-placeholder__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
}

.chat-placeholder__text {
    font-size: var(--font-size-sm);
}
</style>