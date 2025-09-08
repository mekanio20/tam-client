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
                    <CategoryCard v-for="(item, index) in categories.categories" :key="index" :category="item" />
                </div>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
const categories = useCategoriesStore()
</script>