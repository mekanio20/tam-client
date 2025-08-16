<template>
    <h3 class="font-semibold text-[30px] text-[#0C1A30]">
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