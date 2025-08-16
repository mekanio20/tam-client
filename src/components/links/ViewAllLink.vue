<template>
    <router-link :to="to" class="w-fit rounded-full px-4 py-2 flex items-center space-x-1" :style="{ backgroundColor: bg_color }">
        <span class="font-medium leading-[25px]" :style="{ color: text_color }">{{ title }}</span>
        <arrow_right-icon :color="icon_color" />
    </router-link>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    bg_color: {
        type: String,
        default: '#037D841F'
    },
    text_color: {
        type: String,
        default: '#037D84'
    },
    icon_color: {
        type: String,
        default: '#037D84'
    }
})
</script>