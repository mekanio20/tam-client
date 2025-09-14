<template>
    <router-link :to="to" class="w-fit rounded-full sm:px-4 sm:py-2 flex items-center space-x-1 view-all-link" :style="{ '--bg-color': bg_color }">
        <span class="font-medium leading-[25px] sm:text-base text-sm" :style="{ color: text_color }">{{ title }}</span>
        <arrow_right-icon class="sm:block hidden" :color="icon_color" />
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

<style scoped>
.view-all-link {
    background-color: transparent;
}

@media (min-width: 640px) {
    .view-all-link {
        background-color: var(--bg-color);
    }
}
</style>