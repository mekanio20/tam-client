<template>
    <div class="bg-white">
        <FilterSidebar :showSidebar="showSidebar" @close="showSidebar = false" @applyFilters="applyFilters">
            <MainContainer>
                <LinkGroup :items="[{ label: categoryName, to: `/product/list` }]" />
                <div class="py-4 flex sm:flex-row flex-col sm:items-end sm:space-x-5 sm:space-y-0 space-y-4">
                    <h1 class="font-semibold sm:text-[30px] text-xl leading-[25px] text-[#0C1A30]">
                        {{ categoryName }}
                    </h1>
                    <p class="sm:text-sm text-xs leading-[14px] text-[#838589]">
                        {{ productsCount }} haryt
                    </p>
                </div>
                <FilterSection @openFilter="openFilter" @applySort="applySort" />
                <div class="pt-4 pb-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
                    <ProductCard v-for="(item, index) in products" :key="index" :product="item" />
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
const subcategoryStore = useSubcategoriesStore()
const { products, productsCount } = storeToRefs(productsStore)
const { category_info } = storeToRefs(categoryStore)
const { subcategory_info } = storeToRefs(subcategoryStore)
const { fetchCategoryDetails } = categoryStore
const { fetchSubcategoryDetails } = subcategoryStore
const categoryName = ref('Harytlar')

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

const getCategoryName = async () => {
    if (route.query.category) {
        await fetchCategoryDetails(route.query.category)
        categoryName.value = category_info.value.name
        return
    } else if (route.query.subcategory) {
        await fetchSubcategoryDetails(route.query.subcategory)
        categoryName.value = subcategory_info.value.name
    }
}

watch(
    () => [route.query.category, route.query.subcategory],
    async () => {
        let query = null
        if (route.query.category) query = { category: route.query.category }
        if (route.query.subcategory) query = { subcategory: route.query.subcategory }
        await getCategoryName()
        await productsStore.fetchProducts(query)
    }
)

onMounted(async () => {
    let query = null
    if (route.query.category) query = { category: route.query.category }
    if (route.query.subcategory) query = { subcategory: route.query.subcategory }
    productsStore.fetchProducts(query)
    getCategoryName()
})
</script>