<template>
    <div class="bg-white">
        <MainContainer class="-mb-5">
            <div class="sm:py-6 pt-6">
                <LinkGroup :items="[{ label: 'Halananlar', to: '/account/favorite' }]" />
            </div>
        </MainContainer>
        <NoDataSection v-if="!likedProducts.length" image="/icons/favorite.png" desc="Sizde halanan haryt ýok" />
        <ProductSection v-else :isRedirectLink="false" :sectionTitle="'Halanan harytlar'" :products="likedProducts" />
    </div>
</template>

<script setup>
const likesStore = useLikesStore()
const { fetchLikedProducts } = likesStore
const likedProducts = ref([])

onMounted(async () => {
    try {
        likedProducts.value = await fetchLikedProducts()
    } catch (error) {
        console.error('Error fetching likes:', error)
    }
})
</script>