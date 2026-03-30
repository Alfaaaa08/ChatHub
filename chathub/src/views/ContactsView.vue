<script setup lang="ts">
</script>

<template>
    <div class="contacts-view">
        <div class="contacts-view__header">
            <h2 class="contacts-view__title">Contacts</h2>
        </div>

        <div class="contacts-view__content">
            <div class="contacts-view__empty">
                <span class="contacts-view__icon">👥</span>
                <h3>Your contacts</h3>
                <p>General description for your contacts.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contacts-view {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.contacts-view__header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
}

.contacts-view__title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
}

.contacts-view__content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.contacts-view__empty {
    text-align: center;
    color: var(--color-text-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-base);
}

.contacts-view__icon {
    font-size: 3rem;
    opacity: 0.3;
}

.contacts-view__empty h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
}

.contacts-view__empty p {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
}
</style>