<script setup lang="ts">
</script>

<template>
    <div class="settings-view">
        <div class="settings-view__header">
            <h2 class="settings-view__title">Settings</h2>
        </div>

        <div class="settings-view__content">
            <div class="settings-view__empty">
                <span class="settings-view__icon">⚙️</span>
                <h3>App settings</h3>
                <p>General description for the app settings.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.settings-view {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.settings-view__header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
}

.settings-view__title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
}

.settings-view__content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.settings-view__empty {
    text-align: center;
    color: var(--color-text-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-base);
}

.settings-view__icon {
    font-size: 3rem;
    opacity: 0.3;
}

.settings-view__empty h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
}

.settings-view__empty p {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
}
</style>