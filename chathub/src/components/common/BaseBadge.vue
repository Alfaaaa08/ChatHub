<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    count?: number
    max?: number
    variant?: 'primary' | 'danger' | 'success'
    dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    count: 0,
    max: 99,
    variant: 'danger',
    dot: false,
})

const displayText = computed(() => {
    if (props.dot) return ''
    if (props.count > props.max) return `${props.max}+`
    return String(props.count)
})

const isVisible = computed(() => {
    return props.dot || props.count > 0
})
</script>

<template>
    <span v-show="isVisible" :class="[
        'badge',
        `badge--${props.variant}`,
        { 'badge--dot': props.dot },
    ]">
        {{ displayText }}
    </span>
</template>

<style scoped>
.badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    border-radius: var(--radius-full);
    color: white;
    line-height: 1;
}

.badge--primary {
    background: var(--color-accent);
}

.badge--danger {
    background: var(--color-danger);
}

.badge--success {
    background: var(--color-success);
}

.badge--dot {
    min-width: 8px;
    width: 8px;
    height: 8px;
    padding: 0;
}
</style>