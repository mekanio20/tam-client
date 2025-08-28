<template>
    <div class="bg-white mt-5">
        <MainContainer>
            <SectionHeaderGroup>
                <SectionTitle :title="sectionTitle" />
                <ViewAllLink v-if="isRedirectLink" :title="linkTitle" :to="link" />
            </SectionHeaderGroup>
            <Swiper :slides-per-view="slidesPerView" :breakpoints="{
                    100: { slidesPerView: 2, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 30 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                    1280: { slidesPerView: 5, spaceBetween: 30 }
                }">
                <SwiperSlide v-for="(item, index) in products" :key="index" class="py-6">
                    <ProductCard :product="item" @toggleFavorite="toggleFavorite" @addToCart="addToCart" />
                </SwiperSlide>
            </Swiper>
        </MainContainer>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

defineProps({
    slidesPerView: {
        type: [Number, String],
        default: 5
    },
    products: {
        type: Array,
        required: true
    },
    sectionTitle: {
        type: String,
        default: 'Harytlar'
    },
    isRedirectLink: {
        type: Boolean,
        default: true
    },
    linkTitle: {
        type: String,
        default: 'Ählisini görmek'
    },
    link: {
        type: String,
        default: '/'
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