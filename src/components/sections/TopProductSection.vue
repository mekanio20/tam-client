
<template>
    <div class="bg-white mt-5">
        <div class="relative py-10 overflow-hidden bg-[linear-gradient(to_bottom,#FFC745,#FEC84A,#FFDB85,#FEC849,#FFD268)]">
            <!-- Bg Icon -->
            <div class="absolute top-0 left-0">
                <img class="w-[150px] h-[150px]" src="/icons/bg-2.png" />
            </div>
            <MainContainer class="flex items-center justify-end">
                <div class="flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
                    <h2 class="font-bold text-[36px] text-white">Köp satylan harytlar 🏆</h2>
                </div>
                <ViewAllLink title="Ählisini görmek" :to="'/'" bg_color="#FFF8E6" text_color="#FBB103"
                    icon_color="#FBB103" />
            </MainContainer>
            <div class="sm:px-10 px-4 pt-10">
                <Swiper :slides-per-view="slidesPerView" :breakpoints="{
                    100: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 3, spaceBetween: 20 }
                }" class="flex items-center space-x-6">
                    <SwiperSlide v-for="(item, index) in products" :key="index" class="py-6">
                        <TopProductCard :product="item" @toggleFavorite="toggleFavorite" @addToCart="addToCart" />
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
const props = defineProps({
    products: {
        type: Array,
        required: true
    }
})
const emit = defineEmits(['toggleFavorite', 'addToCart'])
const toggleFavorite = (productId) => {
    emit('toggleFavorite', productId)
}

const addToCart = (product) => {
    emit('addToCart', product)
}
</script>