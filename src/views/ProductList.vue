<template>
    <div class="bg-white">
        <FilterSidebar :showSidebar="showSidebar" @close="showSidebar = false" @applyFilters="applyFilters">
            <MainContainer>
                <div class="py-6">
                    <LinkGroup :items="[{ label: 'Köp satylan harytlar', to: '/' }, { label: 'Ösümlikler', to: '/' }]" />
                </div>
                <div class="py-6 flex items-end space-x-5">
                    <h1 class="font-semibold text-[30px] leading-[25px] text-[#0C1A30]">
                        Кухня и столовая
                    </h1>
                    <p class="text-[14px] leading-[14px] text-[#838589]">
                        2067 haryt
                    </p>
                </div>
                <FilterSection @openFilter="openFilter" />
                <div class="pt-4 pb-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                    <ProductCard v-for="(item, index) in products" :key="index" :product="item" @toggleFavorite="toggleFavorite" />
                </div>
            </MainContainer>
        </FilterSidebar>
    </div>
</template>

<script setup>
const products = ref([
    {
        id: 1,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 2,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 3,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 4,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 5,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 6,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    }
])

const showSidebar = ref(false)
const openFilter = () => {
    showSidebar.value = true
}
const applyFilters = (filters) => {
    console.log('Applied filters:', filters);
    showSidebar.value = false
}

const toggleFavorite = (proudctId) => {
    const product = products.value.find(product => product.id === proudctId)
    product.favorite = !product.favorite
}
</script>