<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const roomId = computed(() => route.params.roomId as string)

</script>

<template>
    <div class="chat-room">
        <div class="chat-room__header">
            <span class="chat-room__icon">💬</span>
            <h2 class="chat-room__name">#{{ roomId }}</h2>
            <span class="chat-room__members">3 members</span>
        </div>

        <div class="chat-room__messages">
            <div class="chat-room__empty">
                <p>Chat messages for <strong>#{{ roomId }}</strong> will appear here.</p>
                <p class="chat-room__hint">General description for the chat room.</p>
            </div>
        </div>

        <div class="chat-room__input">
            <input type="text" class="chat-room__input-field" :placeholder="`Message #${roomId}...`" disabled />
        </div>
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

.chat-room__name {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
}

.chat-room__members {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    margin-left: auto;
}

.chat-room__messages {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    padding: var(--space-lg);
}

.chat-room__empty {
    text-align: center;
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
}

.chat-room__hint {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin-top: var(--space-sm);
}

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
}

.chat-room__input-field::placeholder {
    color: var(--color-text-muted);
}

.chat-room__input-field:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>