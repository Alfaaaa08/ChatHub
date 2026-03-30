<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoomStore } from '@/stores/roomStore'
import { useChatStore } from '@/stores/chatStore'
import { useContactStore } from '@/stores/contactStore'
import BaseBadge from '@/components/common/BaseBadge.vue'

const route = useRoute()
const router = useRouter()

const roomStore = useRoomStore()
const chatStore = useChatStore()
const contactStore = useContactStore()
const { sortedRooms } = storeToRefs(roomStore)

const hasActiveRoom = computed(() => !!route.params.roomId)

function selectRoom(roomId: string) {
    roomStore.setActiveRoom(roomId)
    chatStore.markRoomAsRead(roomId)
    router.push({ name: 'chat-room', params: { roomId } })
}

function getLastMessagePreview(roomId: string): string {
    const msg = chatStore.getLastMessage(roomId)
    if (!msg) return 'No messages yet'

    const user = contactStore.getUserById(msg.userId)
    const name = user?.username ?? 'Unknown'
    const text = msg.text.length > 30 ? msg.text.slice(0, 30) + '...' : msg.text
    return `${name}: ${text}`
}

function formatTime(timestamp: string): string {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
    <div class="chat-view">
        <div class="chat-view__rooms">
            <div class="rooms-header">
                <h2 class="rooms-header__title">Chats</h2>
            </div>

            <div class="rooms-list">
                <button v-for="room in sortedRooms" :key="room.id" class="room-item"
                    :class="{ 'room-item--active': route.params.roomId === room.id }" @click="selectRoom(room.id)">
                    <span class="room-item__icon">💬</span>
                    <div class="room-item__info">
                        <div class="room-item__top">
                            <span class="room-item__name">#{{ room.name }}</span>
                            <span v-if="chatStore.getLastMessage(room.id)" class="room-item__time">
                                {{ formatTime(chatStore.getLastMessage(room.id)!.timestamp) }}
                            </span>
                        </div>
                        <div class="room-item__bottom">
                            <span class="room-item__preview">
                                {{ getLastMessagePreview(room.id) }}
                            </span>
                            <BaseBadge :count="chatStore.getUnreadCount(room.id)" variant="primary" />
                        </div>
                    </div>
                </button>
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
    width: 100%;
    text-align: left;
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
    flex: 1;
    min-width: 0;
}

.room-item__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.room-item__name {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
}

.room-item__time {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    flex-shrink: 0;
}

.room-item__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
}

.room-item__preview {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    margin-right: var(--space-sm);
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