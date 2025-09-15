<template>
    <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 10
    },
    color: {
        type: String,
        default: '#d1d5db'
    }
})
</script>