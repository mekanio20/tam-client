<template>
    <div class="bg-white">
        <MainContainer>
            <div class="py-6">
                <LinkGroup
                    :items="[{ label: 'Harytlar', to: '/product/list' }, { label: product_info.name, to: '' }]" />
            </div>

            <!-- Product Content -->
            <div class="pb-12">

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <!-- Left Side - Images -->
                    <div class="flex lg:flex-row flex-col-reverse lg:gap-x-4 gap-y-4">

                        <!-- Thumbnail Images -->
                        <div
                            class="flex-shrink-0 flex lg:flex-col flex-row items-start lg:space-y-2 space-x-2 overflow-auto">
                            <button v-for="(image, index) in product_info.image_urls" :key="index"
                                @click="selectedImage = image"
                                class="flex-shrink-0 w-[100px] h-[100px] bg-[#F6F7F9] rounded-lg overflow-hidden border-[1px] transition-all duration-200 hover:scale-105"
                                :class="selectedImage === image ? 'border-[#FEB918]' : 'border-transparent hover:border-gray-300'">
                                <img :src="image" class="w-full h-full object-contain p-2">
                            </button>
                        </div>

                        <!-- Main Image -->
                        <div class="sm:w-[540px] h-[540px] bg-[#F6F7F9] rounded-lg overflow-hidden relative group">
                            <img :src="selectedImage || product_info?.preview?.path || '/images/box.png'"
                                class="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                                loading="eager">
                        </div>

                    </div>

                    <!-- Right Side - Product Info -->
                    <div class="space-y-6">
                        <!-- Action Buttons (Mobile) -->
                        <div class="flex items-center space-x-3">
                            <StatusTag icon="cup_outline-icon" title="Köp satylan" :icon_size="18" bg_color="#1DB95414"
                                text_color="#1DB954" />
                            <StatusTag icon="favorite-icon" icon_color="#FA004C" :icon_size="18" title="Köp halanan"
                                bg_color="#FA004C14" text_color="#FA004C" />
                        </div>

                        <!-- Product Title -->
                        <div class="space-y-2">
                            <h1 class="text-[24px] font-semibold text-[#0C1A30] leading-tight">
                                {{ product_info.name }}
                            </h1>
                        </div>

                        <!-- Product Info -->
                        <div class="space-y-4">
                            <div class="flex items-center justify-between py-3 border-b border-[#EDEDED]">
                                <span class="text-[#ABABAB] uppercase tracking-wide">BARKODY</span>
                                <span class="text-[#0C1A30] font-medium">{{ product_info.barcode }}</span>
                            </div>
                            <div class="flex items-center justify-between py-3 border-b border-[#EDEDED]">
                                <span class="text-[#ABABAB] uppercase tracking-wide">KATEGORIÝA</span>
                                <span class="text-[#0C1A30] font-medium">{{ product_info.category_name }}</span>
                            </div>
                            <div class="flex items-center justify-between py-3">
                                <span class="text-[#ABABAB] uppercase tracking-wide">BREND</span>
                                <span class="text-[#0C1A30] font-medium">{{ product_info.brand_name }}</span>
                            </div>
                        </div>

                        <!-- Price -->
                        <div class="py-6">
                            <div class="text-[32px] font-bold text-[#0C1A30]">
                                {{ product_info.price }} TMT
                            </div>
                        </div>

                        <!-- Add to Cart Button -->
                        <div class="flex space-x-3">
                            <button @click="addToCart"
                                class="flex-1 bg-[#FEB918] hover:bg-[#ffcf5f] text-white py-4 px-8 rounded-[10px] transition-all duration-200 font-semibold text-[20px]">
                                Sebede goş
                            </button>
                            <button @click="toggleFavorite(product_info.id)"
                                class="p-4 bg-[#FEB91829] rounded-[10px] transition-all duration-200">
                                <favorite-icon color="#FEB918" :fill="isLiked ? '#FEB918' : 'none'" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Product Description -->
                <div class="mt-12 lg:mt-16">
                    <h2 class="text-[20px] font-semibold text-[#0C1A30] mb-6">Haryt barada</h2>
                    <p class="text-[#0C1A30] tracking-[0.2px]">
                        {{ product_info.description }}
                    </p>
                </div>
            </div>
        </MainContainer>
        <!-- Related Products -->
    </div>
</template>

<script setup>
const isInCart = ref(false)
const route = useRoute()
const likesStore = useLikesStore()
const productsStore = useProductsStore()
const { fetchProductDetail } = productsStore
const { product_info } = storeToRefs(productsStore)
const { createLike, deleteLike, fetchLikes } = likesStore
const selectedImage = ref(null)
const isLiked = ref(false)


const toggleFavorite = async (id) => {
    try {
        isLiked.value = !isLiked.value
        if (!product_info.value.is_liked) {
            createLike(id)
            return
        } else {
            const likes = await fetchLikes({ product: id })
            await deleteLike(likes[0].id)
        }
    } catch (error) {
        console.log(error);
        isLiked.value = !isLiked.value
    }
}

const addToCart = () => {
    isInCart.value = true
    setTimeout(() => {
    }, 200)
}

onMounted(async () => {
    const product = await fetchProductDetail(route.params.id)
    isLiked.value = product.is_liked
})
</script>