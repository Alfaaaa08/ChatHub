<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
</script>

<template>
    <div class="not-found">
        <span class="not-found__code">404</span>
        <h1 class="not-found__title">Page not found</h1>
        <p class="not-found__text">
            The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="not-found__actions">
            <BaseButton variant="primary" @click="router.push({ name: 'chat' })">
                Go to Chats
            </BaseButton>
            <BaseButton variant="ghost" @click="router.back()">
                ← Go Back
            </BaseButton>
        </div>
    </div>
</template>

<style scoped>
.not-found {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-base);
    padding: var(--space-xl);
    background: var(--color-bg-primary);
}

.not-found__code {
    font-size: 6rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    opacity: 0.3;
    line-height: 1;
}

.not-found__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
}

.not-found__text {
    color: var(--color-text-secondary);
    font-size: var(--font-size-base);
    text-align: center;
}

.not-found__actions {
    display: flex;
    gap: var(--space-base);
    margin-top: var(--space-base);
}
</style>