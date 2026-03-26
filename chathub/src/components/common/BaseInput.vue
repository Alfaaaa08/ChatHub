<script setup lang="ts">
import { computed, useAttrs } from 'vue'

interface Props {
    label?: string
    hint?: string
    error?: string
    placeholder?: string
    type?: string
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    hint: '',
    error: '',
    placeholder: '',
    type: 'text',
    disabled: false,
})


const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
    focus: []
    blur: []
}>()

const attrs = useAttrs()

const inputClasses = computed(() => ({
    'input-field': true,
    'input-field--error': !!props.error,
    'input-field--disabled': props.disabled,
}))
</script>

<template>
    <div class="input-wrapper">
        <label v-if="props.label" class="input-label">
            {{ props.label }}
            <span v-if="props.hint" class="input-hint">{{ props.hint }}</span>
        </label>

        <div class="input-container">
            <span v-if="$slots.icon" class="input-icon">
                <slot name="icon" />
            </span>

            <input v-model="model" :type="props.type" :placeholder="props.placeholder" :disabled="props.disabled"
                :class="inputClasses" v-bind="attrs" @focus="emit('focus')" @blur="emit('blur')" />
        </div>

        <p v-if="props.error" class="input-error">
            {{ props.error }}
        </p>
    </div>
</template>

<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>

<style scoped>
.input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.input-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    display: flex;
    align-items: baseline;
    gap: var(--space-sm);
}

.input-hint {
    font-weight: var(--font-weight-normal);
    color: var(--color-text-muted);
}

.input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: var(--space-md);
    display: flex;
    align-items: center;
    color: var(--color-text-muted);
    pointer-events: none;
    font-size: var(--font-size-base);
}

.input-field {
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

.input-icon+.input-field {
    padding-left: calc(var(--space-md) + 1.5em + var(--space-sm));
}

.input-field::placeholder {
    color: var(--color-text-muted);
}

.input-field:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-light);
}

.input-field--error {
    border-color: var(--color-danger);
}

.input-field--error:focus {
    box-shadow: 0 0 0 3px rgba(225, 112, 85, 0.15);
}

.input-field--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.input-error {
    color: var(--color-danger);
    font-size: var(--font-size-sm);
    padding: var(--space-xs) 0;
}
</style>