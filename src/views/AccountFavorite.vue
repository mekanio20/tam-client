<template>
    <div class="bg-white">
        <MainContainer class="-mb-5">
            <div class="pt-6">
                <LinkGroup :items="[{ label: 'Halananlar', to: '/account/favorite' }]" />
            </div>
            <SectionTitle title="Halanan harytlar" />
        </MainContainer>
        <NoDataSection v-if="!products.length" image="/images/favorite.png" desc="Sizde halanan haryt ýok" />
        <ProductSection v-else :isRedirectLink="false" :sectionTitle="'Halanan harytlar'" :products="products" @toggleFavorite="toggleFavorite"
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