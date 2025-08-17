<template>
    <div class="flex items-center space-x-4">
        <router-link to="/">
            <home-icon />
        </router-link>
        <router-link v-for="(item, index) in items" :key="index" :to="item.to" class="flex items-center space-x-4">
            <arrow_small-icon />
            <span class="text-sm text-[#838589]">{{ item.label }}</span>
        </router-link>
    </div>
</template>

<script setup>
defineProps({
    items: {
        type: Array,
        required: true
    }
})
</script>