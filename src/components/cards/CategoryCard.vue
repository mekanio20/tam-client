<template>
    <router-link :to="`/product/list/?category=${category.id}`" class="flex-shrink-0 h-[230px] relative rounded-xl overflow-hidden cursor-pointer">
        <h3 class="text-[#0C1A30] text-lg absolute top-4 left-5">
            {{ category.title }}
        </h3>
        <div class="w-full h-full" :style="{ backgroundColor: category.bg_color }">
            <div class="w-[170px] h-[160px] absolute z-20 bottom-0 right-0">
                <img :src="category?.image?.path || '/images/box.png'" class="w-full h-full object-cover" />
            </div>
        </div>
        <div class="w-[320px] h-[320px] rounded-full absolute -bottom-40 -right-40 z-10"
            :style="{ backgroundColor: category.circle_bg_color }"></div>
    </router-link>
</template>


<script setup>
defineProps({
    category: {
        type: Object,
        required: true
    }
})
</script>