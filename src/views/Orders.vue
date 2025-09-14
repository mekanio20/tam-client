<template>
    <div class="bg-white">
        <MainContainer class="-mt-5">
            <div class="py-6">
                <LinkGroup :items="[{ label: 'Sargytlar', to: '/account/orders' }]" />
            </div>
            <SectionTitle title="Sargytlar" />
        </MainContainer>
        <NoDataSection v-if="!products.length" image="/images/box.png" desc="Sargytlaryňyzyň sanawy boş" />
        <ProductSection v-if="!products.length" :products="_products" @toggleFavorite="toggleFavorite" />
        <!-- Orders Table -->
        <MainContainer v-else class="mt-5">
            <OrdersTable />
        </MainContainer>
        
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
    }
])
const _products = ref([
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
const toggleFavorite = (id) => {
    const product = products.value.find(product => product.id === id)
    product.favorite = !product.favorite
}
</script>