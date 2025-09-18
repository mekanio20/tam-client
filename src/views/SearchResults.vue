<template>
    <div class="bg-white">
        <MainContainer class="-mb-5">
            <div class="pt-6">
                <LinkGroup :items="[{ label: 'Gözleg netijesi', to: '' }]" />
            </div>
        </MainContainer>
        <NoDataSection v-if="!searchedProducts.length && !loading" image="/icons/search.png" desc="Siziň gözleýän harydyňyz tapylmady" />
        <ProductSection v-else :isRedirectLink="false" :sectionTitle="searchQuery" :products="searchedProducts" />
    </div>
</template>

<script setup>
const productStore = useProductsStore()
const { fetchProducts, loading } = productStore
const route = useRoute()
const searchedProducts = ref([])
const searchQuery = ref('')

onMounted(async () => {
    try {
        searchQuery.value = route.query.q || ''
        searchedProducts.value = await fetchProducts({ search: searchQuery.value })
    } catch (error) {
        console.error('Error fetching search results:', error)
    }
})

watch(() => route.query.q, async () => {
    try {
        searchQuery.value = route.query.q || ''
        searchedProducts.value = await fetchProducts({ search: searchQuery.value })
    } catch (error) {
        console.error('Error fetching search results:', error)
    }
})
</script>