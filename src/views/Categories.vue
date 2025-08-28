<template>
    <div class="bg-white">
        <MainContainer class="-mb-5">
            <div class="pt-6">
                <LinkGroup :items="[{ label: 'Bölümler', to: '/categories' }]" />
            </div>
        </MainContainer>
        <div class="bg-white mt-5 pb-10">
            <MainContainer>
                <SectionHeaderGroup class="pb-10">
                    <SectionTitle title="Bölümler" />
                </SectionHeaderGroup>
                <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                    <CategoryCard v-for="(item, index) in categories" :key="index" :category="item" />
                </div>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
const categories = ref([
    {
        id: 1,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#037D841F',
        circle_bg_color: '#037D84',
    },
    {
        id: 2,
        title: 'Ösümlikler',
        image: '/images/com-6.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 3,
        title: 'Ösümlikler',
        image: '/images/com-7.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 4,
        title: 'Ösümlikler',
        image: '/images/com-8.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 5,
        title: 'Ösümlikler',
        image: '/images/com-9.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 6,
        title: 'Ösümlikler',
        image: '/images/com-10.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 7,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 8,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 9,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 10,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 11,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 12,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 13,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 14,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 15,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 16,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 17,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    },
    {
        id: 18,
        title: 'Ösümlikler',
        image: '/images/com-5.webp',
        bg_color: '#FFC1071F',
        circle_bg_color: '#FFC107'
    }
])
</script>