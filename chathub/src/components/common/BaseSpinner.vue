<script setup lang="ts">

interface Props {
    size?: number
    color?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 16,
    color: 'currentColor',
})
</script>

<template>
    <span class="spinner" role="status" aria-label="Loading" :style="{
        width: `${props.size}px`,
        height: `${props.size}px`,
        borderWidth: `${Math.max(2, props.size / 8)}px`,
        borderTopColor: props.color,
    }" />
</template>

<style scoped>
.spinner {
    display: inline-block;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>