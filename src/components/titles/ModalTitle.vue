<template>
    <h1 class="sm:text-[22px] text-lg font-medium text-[#0C1A30] mb-14">
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