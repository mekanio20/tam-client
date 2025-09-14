<template>
    <div @click="goToDetail(category.id)"
        class="sm:h-[230px] h-[175px] relative overflow-hidden rounded-[10px]"
        :style="{ backgroundColor: category.bg_color }">
        <h3 class="text-[#0C1A30] text-lg absolute top-4 left-5">
            {{ category.title }}
        </h3>
        <div class="w-[100px] absolute z-20 bottom-0 right-0">
            <img :src="category?.image?.path || '/images/box.png'" class="w-full h-full object-cover" />
        </div>
        <div class="w-[180px] h-[180px] rounded-full absolute -bottom-[70px] -right-[70px] z-10"
            :style="{ backgroundColor: category.circle_bg_color }"></div>
    </div>
</template>


<script setup>
const props = defineProps({
    category: {
        type: Object,
        required: true
    }
})
const router = useRouter()
const goToDetail = (id) => {
    router.push({ name: "ProductList", query: { category: id } })
}
</script>