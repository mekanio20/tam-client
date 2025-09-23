<template>
    <div class="bg-white">
        <MainContainer class="-mb-10">
            <LinkGroup :items="[{ label: 'Bölümler', to: '/categories' }]" />
        </MainContainer>
        <div class="bg-white mt-5 pb-10">
            <MainContainer>
                <SectionHeaderGroup class="sm:pb-10 pb-6">
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
const categoriesStore = useCategoriesStore()
const { categories, loading } = storeToRefs(categoriesStore)
const { fetchCategories } = categoriesStore

onMounted(async () => {
    if (!categories.value?.length) {
        await fetchCategories()
    }
})
</script>