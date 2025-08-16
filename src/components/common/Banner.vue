<template>
    <div class="bg-white mt-5">
        <MainContainer>
            <div class="w-full">
                <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true"
                    :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }"
                    class="rounded-2xl overflow-hidden custom-swiper">
                    <!-- Slide 1 -->
                    <SwiperSlide v-for="slide in 5" :key="slide">
                        <img src="/images/banner-1.webp" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
</script>

<style>
.curtom-swiper .swiper-pagination,
.swiper-pagination-clickable,
.swiper-pagination-bullets,
.swiper-pagination-horizontal {
    padding-bottom: 20px;
}

.custom-swiper .swiper-pagination-bullet {
    margin: 0 0 10px 0;
    background: #FFFFFF99;
}

.custom-swiper .swiper-pagination-bullet-active {
    background: #FFFFFF;
}
</style>