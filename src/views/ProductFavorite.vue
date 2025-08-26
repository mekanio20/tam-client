<template>
    <div class="bg-white">
        <MainContainer class="-mb-5">
            <div class="pt-6">
                <LinkGroup :items="[{ label: 'Halananlar', to: '/product/favorite' }]" />
            </div>
        </MainContainer>
        <div v-if="!products.length" class="flex items-center flex-col justify-center py-24">
            <div class="w-[250px] h-[250px]">
                <img class="w-full h-full" src="/images/favorite.png" />
            </div>
            <h4 class="font-semibold text-[30px] text-[#838589]">
                Sizde halanan haryt ýok
            </h4>
        </div>
        <ProductSection v-else :sectionTitle="'Halanan harytlar'" :products="products" @toggleFavorite="toggleFavorite"
            @addToCart="addToCart" />
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
        favorite: true
    },
    {
        id: 2,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: true
    }
])
const toggleFavorite = (id) => {
    const product = products.value.find(product => product.id === id)
    product.favorite = !product.favorite
}
</script>