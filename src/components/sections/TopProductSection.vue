
<template>
    <div class="bg-white mt-5">
        <div class="relative sm:py-10 py-6 overflow-hidden bg-[linear-gradient(to_bottom,#FFC745,#FEC84A,#FFDB85,#FEC849,#FFD268)]">
            <!-- Bg Icon -->
            <div class="absolute top-0 left-0">
                <img class="w-[150px] h-[150px]" src="/icons/bg-2.png" />
            </div>
            <MainContainer class="flex items-center sm:justify-end justify-between">
                <div class="absolute sm:block hidden left-1/2 transform -translate-x-1/2">
                    <h2 class="font-bold lg:text-[36px] sm:text-[24px] text-lg text-white">Köp satylan harytlar 🏆</h2>
                </div>
                <div class="sm:hidden z-10">
                    <h2 class="font-bold lg:text-[36px] sm:text-[24px] text-lg text-white">Köp satylan harytlar 🏆</h2>
                </div>
                <ViewAllLink title="Ählisini görmek" :to="'/'" bg_color="#FFF8E6" :text_color="textColor"
                    icon_color="#FBB103" />
            </MainContainer>
            <div class="sm:px-10 px-4 sm:pt-10">
                <Swiper :slides-per-view="slidesPerView" :breakpoints="{
                    100: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 3, spaceBetween: 20 }
                }" class="flex items-center space-x-6">
                    <SwiperSlide v-for="(item, index) in products" :key="index" class="py-6">
                        <TopProductCard :product="item" @toggleFavorite="toggleFavorite" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
const slidesPerView = ref(3)
const isMobile = ref(false)

const textColor = computed(() => {
    return isMobile.value ? '#fff' : '#FBB103'
})

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
})
const emit = defineEmits(['toggleFavorite'])
const toggleFavorite = (productId) => {
    emit('toggleFavorite', productId)
}

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 640
}

onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})
</script>