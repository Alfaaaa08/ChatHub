<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
    src?: string
    name?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    status?: 'online' | 'offline' | 'away' | null
}

const props = withDefaults(defineProps<Props>(), {
    src: '',
    name: '',
    size: 'md',
    status: null,
})

const imgFailed = ref(false)

const initials = computed(() => {
    const name = props.name.trim()
    if (!name) return '?'

    const parts = name.split(' ').filter(Boolean)
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name[0].toUpperCase()
})

const showImage = computed(() => {
    return props.src && !imgFailed.value
})

const sizeMap: Record<string, number> = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 88,
}

const sizeInPx = computed(() => sizeMap[props.size] || sizeMap.md)

function handleImageError() {
    imgFailed.value = true
}
</script>

<template>
    <div class="avatar" :style="{
        width: `${sizeInPx}px`,
        height: `${sizeInPx}px`,
    }">
        <img v-if="showImage" :src="props.src" :alt="props.name || 'User avatar'" class="avatar__image"
            @error="handleImageError" />
        <span v-else class="avatar__initials" :style="{ fontSize: `${sizeInPx * 0.38}px` }">
            {{ initials }}
        </span>

        <span v-if="props.status" :class="['avatar__status', `avatar__status--${props.status}`]" />
    </div>
</template>

<style scoped>
.avatar {
    position: relative;
    border-radius: var(--radius-full);
    flex-shrink: 0;
    overflow: hidden;
}

.avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-full);
}

.avatar__initials {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-semibold);
    user-select: none;
    border-radius: var(--radius-full);
    border: 2px solid var(--color-border-light);
}

.avatar__status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: 25%;
    min-width: 8px;
    min-height: 8px;
    border-radius: var(--radius-full);
    border: 2px solid var(--color-bg-secondary);
}

.avatar__status--online {
    background: var(--color-online);
}

.avatar__status--offline {
    background: var(--color-offline);
}

.avatar__status--away {
    background: var(--color-away);
}
</style>