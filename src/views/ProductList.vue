<template>
    <div class="bg-white">
        <FilterSidebar :showSidebar="showSidebar" @close="showSidebar = false" @applyFilters="applyFilters">
            <MainContainer>
                <div class="py-6">
                    <LinkGroup
                        :items="[{ label: `${category_info.name}`, to: `/product/list?category=${category_info.id}` }]" />
                </div>
                <div class="py-6 flex items-end space-x-5">
                    <h1 class="font-semibold text-[30px] leading-[25px] text-[#0C1A30]">
                        {{ category_info.name }}
                    </h1>
                    <p class="text-[14px] leading-[14px] text-[#838589]">
                        {{ category_info.products_count }} haryt
                    </p>
                </div>
                <FilterSection @openFilter="openFilter" @applySort="applySort" />
                <div class="pt-4 pb-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                    <ProductCard v-for="(item, index) in products" :key="index" :product="item"
                        @toggleFavorite="toggleFavorite" />
                </div>
            </MainContainer>
        </FilterSidebar>
    </div>
</template>

<script setup>
const showSidebar = ref(false)
const route = useRoute();

const productsStore = useProductsStore()
const categoryStore = useCategoriesStore()
const { products } = storeToRefs(productsStore)
const { category_info } = storeToRefs(categoryStore)

onMounted(() => {
    productsStore.fetchProducts()
    categoryStore.fetchCategoryDetails(route.query.category)
})

const openFilter = () => {
    showSidebar.value = true
}
const applyFilters = async (filters) => {
    await productsStore.fetchProducts(filters)
    showSidebar.value = false
}

const applySort = async (sort) => {
    switch (sort.id) {
        case 1:
            await productsStore.fetchProducts()
            break;
        case 2:
            await productsStore.fetchNewestProducts()
            break;
        case 3:
            await productsStore.fetchOldestProducts()
            break;
        case 4:
            // 
            break;
        case 5:
            // 
            break;
        case 6:
            await productsStore.fetchMostPurchasedProducts()
            break;
        case 7:
            await productsStore.fetchMostLikedProducts()
            break;
    }
}

const toggleFavorite = (proudctId) => {
    const product = products.value.find(product => product.id === proudctId)
    if (product) {
        product.favorite = !product.favorite
    }
}
</script>