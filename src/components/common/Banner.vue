<template>
    <div class="bg-white rounded-b-[14px]">
        <MainContainer>
            <div class="w-full h-full sm:mt-5">
                <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true"
                    :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }"
                    class="overflow-hidden custom-swiper">
                    <!-- Slide 1 -->
                    <SwiperSlide v-for="slide in 5" :key="slide">
                        <img class="w-full h-full rounded-2xl" src="/images/banner-1.webp" />
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

@media (max-width: 640px) {

    .curtom-swiper .swiper-pagination,
    .swiper-pagination-clickable,
    .swiper-pagination-bullets,
    .swiper-pagination-horizontal {
        padding-bottom: 2px;
    }
}

.custom-swiper .swiper-pagination-bullet-active {
    background: #FFFFFF;
}
</style>