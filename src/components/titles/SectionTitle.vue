<template>
    <h3 class="font-semibold lg:text-[30px] sm:text-[24px] text-lg text-[#0C1A30]">
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