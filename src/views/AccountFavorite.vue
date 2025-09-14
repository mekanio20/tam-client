<template>
    <div class="bg-white">
        <MainContainer class="-mb-5">
            <div class="pt-6">
                <LinkGroup :items="[{ label: 'Halananlar', to: '/account/favorite' }]" />
            </div>
        </MainContainer>
        <NoDataSection v-if="!likedProducts.length" image="/images/favorite.png" desc="Sizde halanan haryt ýok" />
        <ProductSection v-else :isRedirectLink="false" :sectionTitle="'Halanan harytlar'" :products="likedProducts" />
    </div>
</template>

<script setup>
const likesStore = useLikesStore()
const { fetchLikes } = likesStore
const { likes } = storeToRefs(likesStore)

// Extract products from likes
const likedProducts = computed(() => {
    return likes.value.map(like => ({
        ...like.product,
        is_liked: true
    }))
})

// Fetch likes on component mount
onMounted(async () => {
    try {
        await fetchLikes()
    } catch (error) {
        console.error('Error fetching likes:', error)
    }
})

// addToCart is now handled directly in ProductCard component
</script>