<script setup lang="ts">
import BaseSpinner from './BaseSpinner.vue'

interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
})
</script>

<template>
    <button :class="[
        'btn',
        `btn--${props.variant}`,
        `btn--${props.size}`,
        {
            'btn--loading': props.loading,
            'btn--disabled': props.disabled || props.loading,
        },
    ]" :disabled="props.disabled || props.loading">
        <BaseSpinner v-if="props.loading" :size="props.size === 'sm' ? 12 : props.size === 'lg' ? 18 : 14"
            color="currentColor" />

        <span class="btn__content">
            <slot />
        </span>
    </button>
</template>

<style scoped>
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    font-weight: var(--font-weight-semibold);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast),
        opacity var(--transition-fast),
        box-shadow var(--transition-fast);
    white-space: nowrap;
    user-select: none;
}

/* ── Sizes ── */
.btn--sm {
    height: 32px;
    padding: 0 var(--space-md);
    font-size: var(--font-size-sm);
}

.btn--md {
    height: var(--input-height);
    padding: 0 var(--space-lg);
    font-size: var(--font-size-base);
}

.btn--lg {
    height: 52px;
    padding: 0 var(--space-xl);
    font-size: var(--font-size-md);
}

/* ── Variants ── */
.btn--primary {
    background: var(--color-accent);
    color: var(--color-accent-text);
}

.btn--primary:hover:not(:disabled) {
    background: var(--color-accent-hover);
    transform: translateY(-1px);
}

.btn--secondary {
    background: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
}

.btn--secondary:hover:not(:disabled) {
    background: var(--color-bg-hover);
    border-color: var(--color-border-light);
}

.btn--ghost {
    background: transparent;
    color: var(--color-text-secondary);
}

.btn--ghost:hover:not(:disabled) {
    background: var(--color-bg-hover);
    color: var(--color-text-primary);
}

.btn--danger {
    background: var(--color-danger);
    color: white;
}

.btn--danger:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
}

/* ── States ── */
.btn:active:not(:disabled) {
    transform: translateY(0);
}

.btn--disabled,
.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn--loading {
    cursor: wait;
}

.btn__content {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}
</style>