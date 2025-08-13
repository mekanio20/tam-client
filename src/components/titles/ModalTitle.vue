<template>
    <h1 class="text-[22px] font-medium text-[#0C1A30] mb-16">
        {{ title }}
    </h1>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>