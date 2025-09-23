<template>
    <div class="group cursor-pointer flex flex-col sm:space-y-3 space-y-2" @click="goToDetail(product.id)">
        <div
            class="bg-[#F6F7F9] group-hover:bg-[#DCE7FF] rounded-[10px] overflow-hidden duration-300 sm:h-[300px] h-[220px]">
            <div class="relative w-full h-full flex items-center justify-center">
                <!-- Product Image -->
                <img :src="product?.preview?.path || '/images/box.png'" class="w-full h-full object-cover">

                <!-- Favorite -->
                <button type="button" @click.stop="toggleLike" class="absolute right-2 top-2">
                    <div
                        class="w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center">
                        <favorite-icon v-if="!isLiked" color="#A9A9A9" :size="16" />
                        <favorite-icon v-else color="#FA004C" fill="#FA004C" :size="16" />
                    </div>
                </button>

                <!-- Add to Cart / Quantity Controls -->
                <div
                    class="absolute w-full px-4 bottom-4 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-300">
                    <!-- Add to Cart Button -->
                    <button v-if="!isInCart" @click.stop="addToCart" :disabled="isAddingToCart"
                        class="w-full sm:py-3 py-2 text-center sm:text-base text-sm bg-white text-[#FFA100] text-[13px] font-semibold rounded-[6px] disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isAddingToCart">Goşulýar...</span>
                        <span v-else>Sebede goş</span>
                    </button>
                    
                    <!-- Quantity Controls -->
                    <div v-else class="flex items-center justify-center space-x-2 bg-white rounded-[6px] py-2 px-3">
                        <button @click.stop="decreaseQuantity" :disabled="isLoading"
                            class="w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs">
                            -
                        </button>
                        <div class="text-center font-medium text-[#0C1A30] min-w-[20px]">
                            <div v-if="isLoading" class="animate-spin rounded-full h-3 w-3 border border-gray-300 border-t-[#0C1A30] mx-auto"></div>
                            <span v-else>{{ cartItem?.quantity || 0 }}</span>
                        </div>
                        <button @click.stop="increaseQuantity" :disabled="isLoading"
                            class="w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col sm:space-y-2 space-y-1">
            <div class="flex items-center sm:space-x-8 space-x-3">
                <p class="sm:text-[18px] font-semibold text-nowrap"
                    :class="[product.old_price ? 'text-[#FA004C] ' : 'text-[#0C1A30]']">{{ product.price }} {{
        product.currency || 'TMT' }}</p>
                <p v-if="product.old_price" class="text-[#838589] sm:text-sm text-xs line-through text-nowrap">{{
        product.old_price }} {{
        product.currency || 'TMT' }}</p>
            </div>
            <h3 class="font-medium text-[#0C1A30] sm:text-base text-sm tracking-[0.2px]">
                {{ product.name }}
            </h3>
        </div>

    </div>
</template>

<script setup>
const router = useRouter()
const likesStore = useLikesStore()
const cartStore = useCartStore()
const { likes } = storeToRefs(likesStore)
const { createLike, deleteLike } = likesStore
const { addItem, isInCart: checkIsInCart, getCartItem, increaseQuantity: cartIncreaseQuantity, decreaseQuantity: cartDecreaseQuantity, loading } = cartStore

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const isLiked = ref(props.product.is_liked)
const isAddingToCart = ref(false)

// Computed properties
const isInCart = computed(() => checkIsInCart(props.product.id))
const cartItem = computed(() => getCartItem(props.product.id))
const isLoading = computed(() => loading.value)

const goToDetail = (id) => {
    router.push({ name: "ProductDetail", params: { id } })
}

const toggleLike = async () => {
    try {
        if (isLiked.value) {
            const likeItem = likes.value.find(item => item.product === props.product.id)
            if (likeItem) {
                await deleteLike(likeItem.id)
                isLiked.value = false
            }
        } else {
            await createLike(props.product.id)
            isLiked.value = true
        }
    } catch (error) {
        console.error('Error toggling like:', error)
    }
}

const addToCart = async () => {
    if (isAddingToCart.value) return
    isAddingToCart.value = true
    try {
        await addItem(props.product.id)
    } catch (error) {
        console.error('Error adding to cart:', error)
    } finally {
        isAddingToCart.value = false
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
</script>