<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRoomStore } from '@/stores/roomStore'
import { useChatStore } from '@/stores/chatStore'
import { useContactStore } from '@/stores/contactStore'
import { useAuthStore } from '@/stores/authStore'
import BaseAvatar from '@/components/common/BaseAvatar.vue'

const route = useRoute()

const roomStore = useRoomStore()
const chatStore = useChatStore()
const contactStore = useContactStore()
const authStore = useAuthStore()

const { user: currentUser } = storeToRefs(authStore)

const messageText = ref('')

const roomId = computed(() => route.params.roomId as string)

const room = computed(() => roomStore.getRoomById(roomId.value))

const messages = computed(() => chatStore.getMessagesForRoom(roomId.value))

watch(
    () => route.params.roomId,
    (newRoomId) => {
        if (newRoomId) {
            roomStore.setActiveRoom(newRoomId as string)
            chatStore.markRoomAsRead(newRoomId as string)
        }
    },
    { immediate: true },
)

function getUserInfo(userId: string) {
    if (userId === currentUser.value?.id) {
        return {
            username: currentUser.value.username,
            avatarUrl: currentUser.value.avatarUrl || '',
        }
    }
    const user = contactStore.getUserById(userId)
    return {
        username: user?.username ?? 'Unknown',
        avatarUrl: user?.avatarUrl ?? '',
    }
}

function isOwnMessage(userId: string): boolean {
    return userId === currentUser.value?.id
}

function handleSend() {
    if (!messageText.value.trim()) return
    chatStore.sendMessage(roomId.value, messageText.value)
    messageText.value = ''
}

function formatTime(timestamp: string): string {
    return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    })
}
</script>

<template>
    <div class="chat-room">
        <div class="chat-room__header">
            <span class="chat-room__icon">💬</span>
            <div class="chat-room__info">
                <h2 class="chat-room__name">#{{ room?.name ?? roomId }}</h2>
                <span class="chat-room__description">{{ room?.description ?? '' }}</span>
            </div>
            <span class="chat-room__members">{{ room?.members.length ?? 0 }} members</span>
        </div>

        <div class="chat-room__messages">
            <div v-for="msg in messages" :key="msg.id" class="message"
                :class="{ 'message--own': isOwnMessage(msg.userId) }">
                <BaseAvatar v-if="!isOwnMessage(msg.userId)" :src="getUserInfo(msg.userId).avatarUrl"
                    :name="getUserInfo(msg.userId).username" size="sm" />

                <div class="message__content">
                    <span v-if="!isOwnMessage(msg.userId)" class="message__author">
                        {{ getUserInfo(msg.userId).username }}
                    </span>
                    <div class="message__bubble">
                        {{ msg.text }}
                    </div>
                    <span class="message__time">{{ formatTime(msg.timestamp) }}</span>
                </div>
            </div>

            <div v-if="messages.length === 0" class="chat-room__empty">
                <p>No messages in <strong>#{{ room?.name ?? roomId }}</strong> yet.</p>
                <p class="chat-room__hint">Be the first to say something!</p>
            </div>
        </div>

        <form class="chat-room__input" @submit.prevent="handleSend">
            <input v-model="messageText" type="text" class="chat-room__input-field"
                :placeholder="`Message #${room?.name ?? roomId}...`" />
        </form>
    </div>
</template>

<style scoped>
.chat-room {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.chat-room__header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
    background: var(--color-bg-secondary);
}

.chat-room__icon {
    font-size: var(--font-size-lg);
}

.chat-room__info {
    flex: 1;
}

.chat-room__name {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
}

.chat-room__description {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
}

.chat-room__members {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    flex-shrink: 0;
}

.chat-room__messages {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-base);
}

.message {
    display: flex;
    gap: var(--space-sm);
    max-width: 70%;
}

.message--own {
    align-self: flex-end;
    flex-direction: row-reverse;
}

.message__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.message--own .message__content {
    align-items: flex-end;
}

.message__author {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-accent);
    padding-left: var(--space-xs);
}

.message__bubble {
    padding: var(--space-sm) var(--space-base);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
    background: var(--color-surface);
    color: var(--color-text-primary);
    border: 1px solid var(--color-surface-border);
}

.message--own .message__bubble {
    background: var(--color-accent);
    color: var(--color-accent-text);
    border-color: transparent;
}

.message__time {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    padding: 0 var(--space-xs);
}

.chat-room__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--color-text-secondary);
}

.chat-room__hint {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin-top: var(--space-sm);
}

/* ── Input ── */
.chat-room__input {
    padding: var(--space-base) var(--space-lg);
    border-top: 1px solid var(--color-border);
    flex-shrink: 0;
}

.chat-room__input-field {
    width: 100%;
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

.chat-room__input-field::placeholder {
    color: var(--color-text-muted);
}

.chat-room__input-field:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-light);
}
</style>