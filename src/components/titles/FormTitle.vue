<template>
    <label :for="id" class="inline-block mb-3 text-[#838589]">
        {{ title }}
    </label>
</template>

<script setup>
defineProps({
    id: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
})
</script>