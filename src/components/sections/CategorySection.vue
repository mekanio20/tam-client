<template>
    <div class="bg-white mt-5">
        <MainContainer>
            <SectionHeaderGroup>
                <SectionTitle title="Meşhur bölümlerimiz" />
                <ViewAllLink title="Ählisini görmek" :to="'/'" />
            </SectionHeaderGroup>
            <Swiper :slides-per-view="6" :breakpoints="{
                    100: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 5, spaceBetween: 20 },
                    1280: { slidesPerView: 6, spaceBetween: 20 }
                }">
                <SwiperSlide v-for="(item, index) in categories" :key="index" class="py-6">
                    <CategoryCard :category="item" />
                </SwiperSlide>
            </Swiper>
        </MainContainer>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
const props = defineProps({
    categories: {
        type: Array,
        required: true
    },
    sectionTitle: {
        type: String,
        default: 'Harytlar'
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
onMounted(() => {
    console.log('Categories -> ', props.categories);
})
</script>