<template>
    <div class="flex items-center flex-col justify-center py-24">
        <div class="w-[250px] h-[250px]">
            <img class="w-full h-full" :src="image" />
        </div>
        <h4 class="font-semibold text-[30px] text-[#838589]">
            {{ desc }}
        </h4>
    </div>
</template>

<script setup>
defineProps({
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})
</script>