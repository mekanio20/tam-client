<template>
    <div class="bg-white h-[180px] rounded-lg overflow-hidden p-2 relative cursor-pointer" @click="goToDetail">
        <!-- Badge Icon -->
        <div
            class="absolute right-2 top-2 flex-shrink-0 sm:w-[45px] sm:h-[45px] w-[40px] h-[40px] bg-[#FEB91826] rounded-full flex items-center justify-center">
            <rate-icon />
        </div>

        <div class="h-full flex items-center space-x-4">
            <!-- Product Image -->
            <div class="w-[40%] h-full bg-pink-100 rounded-md flex items-center justify-center shrink-0">
                <img :src="product?.image_urls[0] || '/icons/default.webp'" class="w-full h-full object-cover" />
            </div>

            <!-- Content -->
            <div class="w-full flex flex-col justify-center space-y-4">
                <!-- Name -->
                <p class="lg:text-lg sm:text-base text-sm text-[#0C1A30] font-medium leading-snug line-clamp-2 w-[80%]">
                    {{ product.name }}
                </p>

                <!-- Price -->
                <p class="lg:text-lg sm:text-base text-sm font-semibold text-[#FFA100]">
                    {{ product.price }} TMT
                </p>

                <!-- Add to Cart Button / Quantity Controls -->
                <div v-if="!isInCart">
                    <button @click.stop="addToCart" :disabled="isAddingToCart"
                        class="w-full border border-[#FEB918] text-[#FFA100] rounded-md py-2 text-sm font-medium hover:bg-orange-50 transition">
                        <span v-if="isAddingToCart">Goşulýar...</span>
                        <span v-else>Sebede goş</span>
                    </button>
                </div>
                
                <!-- Quantity Controls -->
                <div v-else class="flex items-center justify-center space-x-2 border border-[#FEB918] rounded-md py-2 px-3">
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
</template>

<script setup>
const cartStore = useCartStore()
const { addItem, isInCart: checkIsInCart, getCartItem, increaseQuantity: cartIncreaseQuantity, decreaseQuantity: cartDecreaseQuantity, loading } = cartStore
const isAddingToCart = ref(false)
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});
const router = useRouter()

// Computed properties
const isInCart = computed(() => checkIsInCart(props.product.id))
const cartItem = computed(() => getCartItem(props.product.id))
const isLoading = computed(() => loading.value)

const goToDetail = () => {
    router.push({ name: "ProductDetail", params: { id: props.product.id } })
};

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