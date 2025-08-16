<template>
    <h3 class="text-[#0C1A30] text-lg font-semibold leading-[100%] mb-5">
        {{ title }}
    </h3>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>