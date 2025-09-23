<template>
    <div class="bg-white">
        <MainContainer>
            <LinkGroup :items="[{ label: 'Harytlar', to: '/product/list' }, { label: product_info.name, to: '' }]" />

            <!-- Product Content -->
            <div class="pb-12">

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <!-- Left Side - Images -->
                    <div class="flex lg:flex-row flex-col-reverse gap-y-4 sm:mt-0 mt-6"
                    :class="[product_info.image_urls.length > 0 ? 'lg:gap-x-4' : '']">

                        <!-- Thumbnail Images -->
                        <div v-if="product_info.image_urls" class="flex items-start lg:flex-col flex-row lg:space-y-2 lg:space-x-0 space-x-2 overflow-auto">
                            <div v-for="(image, index) in product_info.image_urls" :key="index"
                                @click="selectedImage = image"
                                class="w-[100px] h-[100px] rounded-lg bg-[#F6F7F9] border-[1px] transition-all duration-200 hover:border-[#FEB918] cursor-pointer"
                                :class="selectedImage === image ? 'border-[#FEB918]' : ''">
                                <img :src="image" class="w-full h-full object-cover rounded-lg">
                            </div>
                        </div>

                        <!-- Main Image -->
                        <div class="h-[540px] bg-[#F6F7F9] rounded-lg overflow-hidden relative group" :class="[product_info.image_urls.length > 0 ? 'md:w-[420px]' : 'w-[570px]']">
                            <img :src="selectedImage || product_info?.preview?.path || '/images/box.png'"
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                            <div v-if="product_info?.brand_name" class="flex items-center justify-between py-3">
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

                        <!-- Add to Cart Button / Quantity Controls -->
                        <div class="flex space-x-3">
                            <!-- Add to Cart Button -->
                            <button v-if="!cartIsInCart" @click="addToCart" :disabled="cartLoading"
                                class="flex-1 bg-[#FEB918] hover:bg-[#ffcf5f] text-white py-4 px-8 rounded-[10px] transition-all duration-200 font-semibold text-[20px] disabled:opacity-60 disabled:cursor-not-allowed">
                                {{ cartLoading ? 'Goşulýar...' : 'Sebede goş' }}
                            </button>
                            
                            <!-- Quantity Controls -->
                            <div v-else class="flex-1 flex items-center justify-center space-x-4 bg-[#FEB918] rounded-[10px] py-4 px-8">
                                <button @click="decreaseQuantity" :disabled="cartLoading"
                                    class="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#FEB918] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold">
                                    -
                                </button>
                                <div class="text-center font-semibold text-white text-[20px] min-w-[40px]">
                                    <div v-if="cartLoading" class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mx-auto"></div>
                                    <span v-else>{{ cartItem?.quantity || 0 }}</span>
                                </div>
                                <button @click="increaseQuantity" :disabled="cartLoading"
                                    class="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#FEB918] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold">
                                    +
                                </button>
                            </div>
                            
                            <button @click="toggleFavorite(product_info.id)"
                                class="p-4 bg-[#FEB91829] rounded-[10px] transition-all duration-200">
                                <favorite-icon color="#FEB918" :fill="isLiked ? '#FEB918' : 'none'" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Product Description -->
                <div v-if="product_info?.description" class="mt-12 lg:mt-16">
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
const route = useRoute()
const likesStore = useLikesStore()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const { fetchProductDetail } = productsStore
const { product_info } = storeToRefs(productsStore)
const { createLike, deleteLike, fetchLikes } = likesStore
const { addItem, loading: cartLoading, isInCart: checkIsInCart, getCartItem, increaseQuantity: cartIncreaseQuantity, decreaseQuantity: cartDecreaseQuantity } = cartStore
const selectedImage = ref(null)
const isLiked = ref(false)

// Computed properties
const cartIsInCart = computed(() => product_info.value?.id ? checkIsInCart(product_info.value.id) : false)
const cartItem = computed(() => product_info.value?.id ? getCartItem(product_info.value.id) : null)


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

const addToCart = async () => {
    try {
        await addItem(product_info.value.id, 1)
    } catch (error) {
        console.error('Failed to add to cart:', error)
    }
}

const increaseQuantity = async () => {
    try {
        await cartIncreaseQuantity(cartItem.value.id)
    } catch (error) {
        console.error('Error increasing quantity:', error)
    }
}

const decreaseQuantity = async () => {
    try {
        await cartDecreaseQuantity(cartItem.value.id)
    } catch (error) {
        console.error('Error decreasing quantity:', error)
    }
}

onMounted(async () => {
    const product = await fetchProductDetail(route.params.id)
    isLiked.value = product.is_liked
})
</script>