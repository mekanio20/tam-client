<template>
    <div :style="{ width: `${width}px`, height: `${height}px` }">
        <img class="w-full h-full" src="/icons/logo.png" />
    </div>
</template>

<script setup>
defineProps({
    width: { type: Number, default: 132 },
    height: { type: Number, default: 46 }
})
</script>